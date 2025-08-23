import { createAdapter } from "@socket.io/redis-adapter";
import { Server } from "socket.io";
import http from "http";
import { redis, redisSub, keys } from "../caching/Redis";
import { TUser, TMessage, useGlobalAppDataSource, TMediaType, TMessageStatus } from "@chat/context";
import moment from "moment";

export type Message = {
    id?: string;
    text?: string;
    duration?: string;
    timestamp?: string;
    file?: File;
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
                const room = makeRoom(userId, peerId);
                socket.join(room);

                // Warm cache: send recent 50 from Redis or DB
                const cached = await redis.zrevrange(keys.recent(room), 0, 49);
                if (cached.length) {
                    const msgs = cached.reverse().map((j) => JSON.parse(j));
                    socket.emit("history", { room, messages: msgs });
                } else {
                    const messages = await messageRepository.find({
                        where: { room },
                        order: { createdAt: "ASC" },
                        take: 50,
                        relations: ["sender", "receiver", "media", "parentMessage"],
                    });
                    socket.emit("history", { room, messages });
                }
            });

            socket.on("typing", async ({ peerId, isTyping }: { peerId: number; isTyping: boolean }) => {
                const room = makeRoom(userId, peerId);
                const key = keys.typing(room, userId);
                if (isTyping) {
                    await redis.set(key, "1", "EX", 10); // 10s TTL
                } else {
                    await redis.del(key);
                }
                socket.to(room).emit("typing", { userId, isTyping });
            });

            socket.on("send", async (payload: { tempId: string; peerId: number; content: Message }) => {
                const { tempId, peerId, content } = payload;
                const room = makeRoom(userId, peerId);

                try {
                    console.log("Inserting message:", { room, senderId: userId, receiverId: peerId, content });

                    // Persist message
                    const sender = await TUser.findOneByOrFail({ id: userId });
                    const receiver = await TUser.findOneByOrFail({ id: peerId });
                    const msg = messageRepository.create({
                        room,
                        content: content?.text,
                        reaction: content?.reaction,
                        contentType: content?.file ? TMediaType.FILE : TMediaType.TEXT,
                        status: TMessageStatus?.DELIVERED,
                        sender,
                        receiver
                    });
                    const saved = await msg.save();

                    // Cache recent messages
                    const json = JSON.stringify({
                        id: saved.id,
                        content: saved.content,
                        senderId: userId,
                        receiverId: peerId,
                        createdAt: saved.createdAt,
                        room,
                    });

                    await redis.zadd(keys.recent(room), Date.now(), json);
                    await redis.zremrangebyrank(keys.recent(room), 0, -101); // Keep ~100 latest messages

                    // ACK to sender & emit to room
                    socket.emit("ack", { tempId, id: saved.id, createdAt: saved.createdAt });
                    socket.to(room).emit("receive", JSON.parse(json));

                    // Notify peer's active sockets
                    const peerSockets = await redis.smembers(keys.socketsByUser(peerId));
                    for (const sid of peerSockets) {
                        io.to(sid).emit("notify", { from: userId, preview: content });
                    }
                } catch (error) {
                    console.error("Error sending message:", error);
                    socket.emit("error", { message: "Failed to send message." });
                }
            });

            socket.on("read", async ({ peerId, messageIds }: { peerId: number; messageIds: number[] }) => {
                const room = makeRoom(userId, peerId);
                try {
                    await messageRepository.update(messageIds, { readAt: moment().toISOString() });
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

export function makeRoom(a: number, b: number) {
    const [x, y] = [a, b].sort((m, n) => m - n);
    return `dm:${x}:${y}`;
}