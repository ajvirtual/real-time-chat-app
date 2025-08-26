import { createAdapter } from "@socket.io/redis-adapter";
import { Server } from "socket.io";
import http from "http";
import { redis, redisSub, keys } from "../caching/Redis";
import { TUser, TMessage, useGlobalAppDataSource, TMediaType, TMessageStatus, TRoom, TFile } from "@chat/context";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash";

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
    const userRepository = dataSource?.getRepository(TUser);

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
                const room = await findOrCreateDMRoom(userId, peerId, roomRepository!, userRepository!);
                socket.join(room.id.toString()); // Use DB id as socket room key

                const cached = await redis.zrevrange(keys.recent(room.id.toString()), 0, 49);
                if (cached.length) {
                    const msgs = cached.reverse().map((j) => JSON.parse(j));
                    console.log('msg////////begin')
                    console.log(msgs)
                    console.log('msg////////END')
                    socket.emit("history", { room: room.id, messages: msgs });
                } else {
                    const messages = await messageRepository.find({
                        where: { room: { id: room.id } },
                        relations: ["sender", "receiver", "media", "parentMessage"],
                        order: { createdAt: "ASC" },
                        take: 50,
                    });
                    const msgs = await Promise.all(
                        messages?.map(async (message) => {
                            return {
                                id: message.id,
                                text: message?.content,
                                timestamp: message?.createdAt,
                                userId: (await message?.sender)?.id,
                                file: !_.isEmpty(message?.media) ? message?.media : null,
                                image: !_.isEmpty(message?.media) ? message?.media : null,
                                roomId: room?.id,
                                isAttachment: !_.isEmpty(message?.media),
                                reaction: message.reaction,
                                status: message.status,
                                replyTo: (await message?.parentMessage)?.id,
                                edited: !!message?.editedAt,
                                removed: !!message?.deletedAt
                            }
                        }) || []
                        );
                    socket.emit("history", { room: room.id, messages: msgs });
                }
            });

            socket.on("joinRoom", async ({ userId, peerId }) => {
                const room = await findOrCreateDMRoom(userId, peerId, roomRepository!, userRepository!);
                socket.data.roomId = room?.id;
                socket.data.userId = userId;

                await socket.join(room?.id?.toString());
            });

            socket.on("getRoom", async ({ userId, peerId }) => {
                const room = await findOrCreateDMRoom(userId, peerId, roomRepository!, userRepository!);
                socket.emit("room:id", room.id);
            });

           socket.on("typing", async ({ isTyping, roomId, userId }: { isTyping: boolean; roomId: number; userId: number }) => {
                const room = await roomRepository!.findOneByOrFail({ id: roomId });
                const key = keys.typing(room, userId);
                if (!key) return;
                
                const currentlyTyping = await redis.exists(key);
                
                if (isTyping && !currentlyTyping) {
                    // User started typing
                    await redis.set(key, "1", "EX", 10);
                    socket.to(room.id.toString()).emit("typing", { isTyping: true, roomId: room.id, userId });
                } else if (!isTyping && currentlyTyping) {
                    // User stopped typing
                    await redis.del(key);
                    socket.to(room.id.toString()).emit("typing", { isTyping: false, roomId: room.id, userId });
                }
                
                console.log('socket rooms', { isTyping, roomId: room.id, userId });
            });

            socket.on("send", async ({ tempId, roomId, userId, content }) => {
                try {
                    const room = await roomRepository.findOne({
                        where: { id: roomId },
                        relations: ["users"]
                    });
                    if (!room) {
                        socket.emit("error", { tempId, message: "Room not found" });
                        return;
                    }

                    const sender = await userRepository!.findOneByOrFail({ id: userId });
                    const receiver = room.users?.find((u) => u.id !== userId);
                    const parentMessage = content?.replyTo ? await messageRepository.findOneBy({ id: Number(content.replyTo) }) : undefined;
                    let contentType = TMediaType.TEXT;
                    if(!!content?.image) {
                        contentType = TMediaType.IMAGE
                    } 
                    if(!!content?.file && content?.isAttachment) {
                        contentType = TMediaType.FILE
                    }

                    let media = content?.file;
                    // TODO: handle file upload & save in TFile repository if needed

                    let content_;
                    console.log('REMOVE MESSAGE')
                    console.log(content.id)
                    // Check if this is an edit (existing message with ID)
                    console.log('TO REMOVE')
                    console.log(content)
                    if (content?.removed) {
                        console.log('about to remove')
                        try {
                            // 1. Update database
                            await messageRepository.update(content?.id, {
                                removed: true,
                                updatedAt: new Date(), // manually bump since @UpdateDateColumn no longer has onUpdate
                            });

                            // 2. Update cache
                            const cacheKey = `message:${content?.id}`;
                            const cached = await redis.get(cacheKey);

                            if (cached) {
                                const parsed = JSON.parse(cached);
                                parsed.removed = true;
                                parsed.updatedAt = new Date().toISOString();

                                await redis.set(cacheKey, JSON.stringify(parsed));
                            }

                            // 3. Emit socket event so peers know about removal
                            socket.to(room.id.toString()).emit("message:removed", {
                                id: content?.id,
                                by: userId,
                            });

                            return; // exit after handling removal
                        } catch (error) {
                            console.error("Error removing message:", error);
                        }
                        return;
                    }
                    const existingMessage = content?.id ? await messageRepository.findOneBy({ id: content.id }) : null;
                    console.log(existingMessage)
                    if (existingMessage) {
                        // EDIT MESSAGE
                        console.log('///////////////////// EDIT MESSAGE /////////////////////');
                        
                        let updateData: any = {
                            parentMessage: parentMessage,
                        };

                        if(content?.replyTo) {
                            updateData.parentMessage = await messageRepository.findOneBy({ id: content?.replyTo })
                        }
                        if (!!content.status) {
                            updateData.status = content?.status;
                        }
                        if (!!content.reaction || content.reaction === '') {
                            updateData.reaction = content?.reaction;
                        }
                        if (content.removed) {
                            updateData.deletedAt = moment().toLocaleString();
                        }
                        if (content?.text !== existingMessage.content) {
                            updateData.content = content?.text
                            updateData.editedAt = moment().toLocaleString();
                        }
                        if (content?.file) {
                            updateData.media = content?.file
                        }
                        if (!!contentType) {
                            updateData.contentType = contentType
                        }

                        console.log('updateData', updateData)
                        console.log('existingMessage', existingMessage.id)

                        const updated = await messageRepository.update(existingMessage.id, updateData);
                        console.log('updated__', updated)
                        console.log('updated', updated[0])

                        const updatedMessage = await messageRepository.find({
                            where: { id: existingMessage.id },
                            relations: ["sender", "receiver", "media", "parentMessage"],
                        });
                        const updatedMessage_ = updatedMessage[0]

                        console.log('updated message : ', updatedMessage[0])
                        content_ = {
                            id: updatedMessage_.id,
                            text: updatedMessage_.content,
                            timestamp: updatedMessage_.createdAt,
                            userId: (await updatedMessage_?.sender)?.id,
                            file: !_.isEmpty(updatedMessage_?.media) ? updatedMessage_?.media : null,
                            image: !_.isEmpty(updatedMessage_?.media) ? updatedMessage_?.media : null,
                            roomId: room?.id,
                            isAttachment: !_.isEmpty(updatedMessage_?.media),
                            reaction: updatedMessage_?.reaction,
                            status: updatedMessage_?.status,
                            replyTo: (await updatedMessage_?.parentMessage)?.id,
                            edited: !!updatedMessage_?.editedAt,
                            removed: !!updatedMessage_?.deletedAt
                        };

                        // Update Redis cache
                        const key = keys.recent(room.id.toString());
                        const json = JSON.stringify(content_);
                        console.log('content__edited_from_client', content_)
                        
                        const existingMessages = await redis.zrange(key, 0, -1);
                        let prevScore = null;
                        
                        for (const msg of existingMessages) {
                            try {
                                const parsed = JSON.parse(msg);
                                if (parsed.id === existingMessage.id) {
                                    prevScore = await redis.zscore(key, msg);
                                    await redis.zrem(key, msg);
                                    break;
                                }
                            } catch (parseError) {
                                console.error('Error parsing cached message:', parseError);
                            }
                        }

                        // Use original score or current timestamp
                        const score = prevScore !== null ? prevScore : Date.now();
                        await redis.zadd(key, score, json);
                        await redis.zremrangebyrank(key, 0, -101);

                        // Send acknowledgment to sender
                        socket.emit("ack", { tempId, id: existingMessage.id, content: content_ });

                        // Emit to other room members
                        socket.to(room.id.toString()).emit("receive", content_);

                    } else {

                        // CREATE new message
                        const msg = messageRepository.create({
                            sender,
                            receiver,
                            room,
                            content: content?.text,
                            reaction: content?.reaction,
                            media,
                            contentType,
                            status: content?.status || TMessageStatus.SENT,
                            parentMessage
                        });
                        
                        const saved = await messageRepository.save(msg);
                        console.log('saved : ', saved)
                        content_ = {
                            id: saved.id,
                            text: saved.content,
                            timestamp: saved.createdAt,
                            userId: (await saved?.sender)?.id,
                            file: !_.isEmpty(saved?.media) ? saved?.media : null,
                            image: !_.isEmpty(saved?.media) ? saved?.media : null,
                            roomId: room?.id,
                            isAttachment: !_.isEmpty(saved?.media),
                            reaction: saved?.reaction,
                            status: saved?.status,
                            replyTo: (await saved?.parentMessage)?.id,
                        };
                        console.log('content_', content_)

                        // Send acknowledgment to sender
                        socket.emit("ack", { 
                            tempId, 
                            id: saved.id, 
                            createdAt: saved.createdAt,
                            status: saved.status
                        });

                        // Update Redis recent messages
                        const json = JSON.stringify(content_);
                        console.log("///// MESSAGE SENT //////");
                        console.log(json);
                        
                        await redis.zadd(keys.recent(room.id.toString()), Date.now(), json);
                        await redis.zremrangebyrank(keys.recent(room.id.toString()), 0, -101);

                        // Emit to other room members
                        socket.to(room.id.toString()).emit("receive", content_);
                    }

                } catch (error) {
                    console.error('Error handling send message:', error);
                    socket.emit("error", { 
                        tempId, 
                        message: "Failed to send message",
                        error: error.message 
                    });
                }
            });

            socket.on("read", async ({ peerId, messageIds }: { peerId: number; messageIds: number[] }) => {
                const room = await findOrCreateDMRoom(userId, peerId, roomRepository!, userRepository!);
                if (!_.isEmpty(messageIds)) {
                    try {
                        const now = moment().toLocaleString();
                        await messageRepository.update(messageIds, { readAt: now, status: TMessageStatus.SEEN });

                        const key = keys.recent(room.id.toString());
                        const cachedMessages = await redis.zrange(key, 0, -1);

                        for (const cached of cachedMessages) {
                            const parsed = JSON.parse(cached);

                            if (messageIds.includes(parsed.id)) {
                                await redis.zrem(key, cached);

                                parsed.readAt = now;
                                parsed.status = TMessageStatus.SEEN;

                                const score = Date.parse(parsed.createdAt) || Date.now();
                                await redis.zadd(key, score, JSON.stringify(parsed));
                            }
                        }

                        socket.to(room.id.toString()).emit("read", { room, messageIds, by: userId });
                    } catch (error) {
                        console.error("Error marking messages as read:", error);
                    }
                }
            });


            socket.on("user:online", async ({ userId, peerId }: { userId: number; peerId: number }) => {
                await redis.set(keys.presence(userId), "online");
                const room = await findOrCreateDMRoom(userId, peerId, roomRepository!, userRepository!);
                const user = await userRepository?.findOne({ where: { id: userId } });
                socket.to(room?.id?.toString()).emit("user:online", { userId, userName: user?.fullName });
            });

            socket.on("user:active", async ({ roomId, userId, peerId }) => {
                const key = keys.active(userId); 
                await redis.set(key, "1", "EX", 60);

                const peerKey = keys.active(peerId);
                const peerOnline = await redis.get(peerKey);
                socket.to(roomId?.toString()).emit("peer:active", { online: !!peerOnline });
            });

            socket.on("disconnect", async () => {
                socket.to(socket?.data?.roomId?.toString()).emit("peer:active", { online: false });
                const key = keys.active(socket.data.userId);
                await redis.del(key);    
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
    roomRepository: any,
    userRepository: any
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
            userRepository!.findOneByOrFail({ id: a }),
            userRepository!.findOneByOrFail({ id: b }),
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