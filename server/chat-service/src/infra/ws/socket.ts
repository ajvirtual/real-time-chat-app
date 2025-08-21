import { createAdapter } from "@socket.io/redis-adapter";
import { Server } from "socket.io";
import http from "http";
import { redis, redisSub, keys } from "../caching/Redis";
import { TUser, TMessage } from "@chat/graphql";
import moment from "moment";
import { ENV } from "@chat/context";

export function attachSocket(server: http.Server) {
    const io = new Server(server, {
        cors: { origin: ENV.CORS_ORIGIN?.split(",") ?? ["http://localhost:4000"], credentials: true },
    });
    io.adapter(createAdapter(redis as any, redisSub as any));

    io.use(async (socket, next) => {
        const userId = Number(socket.handshake.auth?.userId ?? socket.handshake.query.userId);
        if (!userId) return next(new Error("unauthorized"));
        (socket.data as any).userId = userId;
        next();
    });

    io.on("connection", async (socket) => {
        const userId: number = socket.data.userId;

        // Track presence and socket mapping
        await redis.sadd(keys.socketsByUser(userId), socket.id);
        await redis.set(keys.presence(userId), "online");

        socket.on("join:dm", async ({ peerId }: { peerId: number }) => {
            const room = makeRoom(userId, peerId);
            socket.join(room);
            // warm cache: send recent 50 from Redis or DB
            const cached = await redis.zrevrange(keys.recent(room), 0, 49);
            if (cached.length) {
                const msgs = cached.reverse().map((j) => JSON.parse(j));
                socket.emit("history", { room, messages: msgs });
            } else {
                const messages = TMessage.find({
                    where: {
                        room,
                        sender: { id: userId },
                        receiver: { id: peerId }
                    },
                    order: { createdAt: "ASC" },
                    take: 50,
                    relations: ["sender", "receiver", "media", "parentMessage"]
                })
                socket.emit("history", { room, messages });
            }
        });

        socket.on("typing", async ({ peerId, isTyping }: { peerId: number; isTyping: boolean }) => {
            const room = makeRoom(userId, peerId);
            const key = keys.typing(room, userId);
            if (isTyping) {
                await redis.set(key, "1", "EX", 4); // 4s TTL
            } else {
                await redis.del(key);
            }
            socket.to(room).emit("typing", { userId, isTyping });
        });

        socket.on("send", async (payload: { tempId: string; peerId: number; content: string }) => {
            const { tempId, peerId, content } = payload;
            const room = makeRoom(userId, peerId);

            // Persist
            const sender = await TUser.findOneByOrFail({ id: userId });
            const receiver = await TUser.findOneByOrFail({ id: peerId });

            const msg = TMessage.create({ room, content, sender, receiver });
            const saved = await msg.save();

            // Cache recent
            const json = JSON.stringify({
                id: saved.id,
                content: saved.content,
                senderId: userId,
                receiverId: peerId,
                createdAt: saved.createdAt,
                room,
            });

            await redis.zadd(keys.recent(room), Date.now(), json);
            await redis.zremrangebyrank(keys.recent(room), 0, -101); // keep ~100 latest

            // ACK to sender & emit to room
            socket.emit("ack", { tempId, id: saved.id, createdAt: saved.createdAt });
            socket.to(room).emit("receive", JSON.parse(json));

            // Push to peer's active sockets (if not in room yet)
            const peerSockets = await redis.smembers(keys.socketsByUser(peerId));
            for (const sid of peerSockets) io.to(sid).emit("notify", { from: userId, preview: content });
        });

        socket.on("read", async ({ peerId, messageIds }: { peerId: number; messageIds: number[] }) => {
            const room = makeRoom(userId, peerId);
            await TMessage.update(messageIds, { readAt: moment().toISOString() });
            socket.to(room).emit("read", { room, messageIds, by: userId });
        });

        socket.on("disconnect", async () => {
            await redis.srem(keys.socketsByUser(userId), socket.id);
            const remaining = await redis.scard(keys.socketsByUser(userId));
            if (remaining === 0) await redis.set(keys.presence(userId), "offline");
        });
    });

    return io;
}

export function makeRoom(a: number, b: number) {
    const [x, y] = [a, b].sort((m, n) => m - n);
    return `dm:${x}:${y}`;
}