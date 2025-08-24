import { createAdapter } from "@socket.io/redis-adapter";
import { Server } from "socket.io";
import http from "http";
import { redis, redisSub, keys } from "../caching/Redis";
import { TUser, TMessage, useGlobalAppDataSource, TMediaType, TMessageStatus, TRoom, TFile } from "@chat/context";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

export type Message = {
    id?: number;
    text?: string;
    timestamp?: string;
    file?: File;
    userId?: number;
    roomId?: number;
    image?: string;
    isAttachment?: boolean;
    reaction?: string;
    replyTo?: string;
    edited?: boolean;
    removed?: boolean;
};

export function attachSocket(server: http.Server) {
    const dataSource = useGlobalAppDataSource();
    const messageRepository = dataSource?.getRepository(TMessage);
    const roomRepository = dataSource?.getRepository(TRoom);
    const fileRepository = dataSource?.getRepository(TFile);

    const io = new Server(server, {
        cors: { origin: process.env.CORS_ORIGIN?.split(",") ?? ["http://localhost:4000"], credentials: true },
    });
    io.adapter(createAdapter(redis as any, redisSub as any));

    io.use(async (socket, next) => {
        // Light auth demo: trust userId from query/header (replace with JWT in prod)
        const userId = Number(socket.handshake.auth?.userId ?? socket.handshake.query.userId);
        if (!userId) return next(new Error("unauthorized"));
        (socket.data as any).userId = userId;
        next();
    });

    io.on("connection", async (socket) => {
        const userId: number = socket.data.userId;

        try {
            // Track presence and socket mapping
            await redis.sadd(keys.socketsByUser(userId), socket.id);
            await redis.set(keys.presence(userId), "online");

            socket.on("join:dm", async ({ peerId }: { peerId: number }) => {
                const room = await findOrCreateDMRoom(userId, peerId, roomRepository!);
                socket.join(room.id.toString()); // Use DB id as socket room key

                const cached = await redis.zrevrange(keys.recent(room.id.toString()), 0, 49);
                console.log('cached', cached)
                if (cached.length) {
                    const msgs = cached.reverse().map((j) => JSON.parse(j));
                    socket.emit("history", { room: room.id, messages: msgs });
                } else {
                    const messages = await messageRepository.find({
                        where: { room: { id: room.id } },   // 👈 disambiguates the id
                        relations: ["sender", "receiver", "media", "parentMessage"],
                        order: { createdAt: "ASC" },
                        take: 50,
                    });

                    socket.emit("history", { room: room.id, messages });
                }
            });

            socket.on("getRoom", async ({ userId, peerId }) => {
                const room = await findOrCreateDMRoom(userId, peerId, roomRepository!);
                console.log('///// ROOM ID //////')
                console.log(room.id)
                socket.emit("room:id", room.id);
            });

            socket.on("typing", async ({ roomId, userId }: { roomId: number; userId: number }) => {
                console.log('///// TYPING //////')
                console.log({ roomId, userId })
                const room = await roomRepository!.findOneByOrFail({ id: roomId });
                const key = keys.typing(room, userId);
                if (!key) return;
                const isTyping = !(await redis.get(key));
                if (isTyping) {
                    await redis.set(key, "1", "EX", 10); // 10s TTL
                } else {
                    await redis.del(key);
                }
                socket.to(room).emit("typing", { roomId, userId });
            });

            socket.on("send", async ({tempId, roomId, userId, content}) => {
                const room = await roomRepository.findOne({
                    where: {
                        id: roomId
                    },
                    relations: ["users"]
                });
                const sender = await TUser.findOneByOrFail({ id: userId });
                const receiver = room.users?.find((u) => u.id !== userId);
                const parentMessage = content?.replyTo ? await messageRepository.findOneBy({ id: Number(content.replyTo) }) : undefined;
                let media = null

                // if(content?.file) {
                //     media = await fileRepository.create(
                //         {
                //             name: content.file.name,
                //             hash: uuidv4(),
                //             mimetype: content.file.type,
                //         }
                //     ).save()
                // }

                const msg = messageRepository.create({
                    room,
                    content: content?.text,
                    reaction: content?.reaction,
                    contentType: content?.file ? TMediaType?.FILE : TMediaType?.TEXT,
                    status: TMessageStatus.DELIVERED,
                    sender,
                    receiver,
                    media,
                    parentMessage
                });
                const saved = await msg.save();
                const content_ = {
                    ...content,
                    id: saved.id,
                }
                const json = JSON.stringify(content_);
                console.log('///// MESSAGE SENT //////')
                console.log(json)

                await redis.zadd(keys.recent(room.id.toString()), Date.now(), json);
                await redis.zremrangebyrank(keys.recent(room.id.toString()), 0, -101);

                socket.emit("ack", { tempId, id: saved.id, createdAt: saved.createdAt });
                socket.to(room.id.toString()).emit("receive", JSON.parse(json));
            });

            socket.on("read", async ({ peerId, messageIds }: { peerId: number; messageIds: number[] }) => {
                const room = await findOrCreateDMRoom(userId, peerId, roomRepository!);
                try {
                    await messageRepository.update(messageIds, { readAt: moment().toLocaleString(), status: TMessageStatus.READ });
                    socket.to(room).emit("read", { room, messageIds, by: userId });
                } catch (error) {
                    console.error("Error marking messages as read:", error);
                }
            });

            socket.on("disconnect", async () => {
                try {
                    await redis.srem(keys.socketsByUser(userId), socket.id);
                    const remaining = await redis.scard(keys.socketsByUser(userId));
                    if (remaining === 0) await redis.set(keys.presence(userId), "offline");
                } catch (error) {
                    console.error("Error handling disconnect:", error);
                }
            });
        } catch (error) {
            console.error("Error during connection:", error);
        }
    });

    return io;
}

const findOrCreateDMRoom = async (
    userId: number,
    peerId: number,
    roomRepository: any
) => {
    // Always order the pair so uniqueness is guaranteed
    const [a, b] = [userId, peerId].sort((x, y) => x - y);

    // Look for an existing private room with *exactly* these 2 members
    let room = await roomRepository
        .createQueryBuilder("room")
        .leftJoin("room.users", "user")
        .where("room.isPrivate = :priv", { priv: true })
        .andWhere("user.id IN (:...ids)", { ids: [a, b] })
        .groupBy("room.id")
        .having("COUNT(user.id) = 2") // must have both users
        .getOne();

    if (!room) {
        const users = await Promise.all([
            TUser.findOneByOrFail({ id: a }),
            TUser.findOneByOrFail({ id: b }),
        ]);

        room = roomRepository.create({
            name: `dm:${a}:${b}`,
            isPrivate: true,
            users,
        });

        room = await roomRepository.save(room);
    }

    return room;
};