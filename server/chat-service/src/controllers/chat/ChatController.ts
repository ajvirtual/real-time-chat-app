import { Socket } from "socket.io";
import { keys, redis } from "infra/caching/Redis";
import { TMessage, TUser } from "@chat/graphql";
import moment from "moment";

export const joinDM = async (socket: Socket, userId: number, peerId: number) => {
    const room = `dm:${Math.min(userId, peerId)}:${Math.max(userId, peerId)}`;
    socket.join(room);

    const cachedMessages = await redis.zrevrange(keys.recent(room), 0, 49);
    if (cachedMessages.length) {
        const messages = cachedMessages.reverse().map((msg) => JSON.parse(msg));
        socket.emit("history", { room, messages });
    } else {
        const messages = await TMessage.find({
            where: { room },
            order: { createdAt: "ASC" },
            take: 50,
            relations: ["sender", "receiver"],
        });
        socket.emit("history", { room, messages });
    }
}

export const sendMessage = async (socket: Socket, userId: number, payload: { tempId: string; peerId: number; content: string }) => {

    const { tempId, peerId, content } = payload;
    const room = `dm:${Math.min(userId, peerId)}:${Math.max(userId, peerId)}`;

    const sender = await TUser.findOneByOrFail({ id: userId });
    const receiver = await TUser.findOneByOrFail({ id: peerId });

    const message = TMessage.create({ room, content, sender, receiver });
    const savedMessage = await message.save();

    const messageData = {
        id: savedMessage.id,
        content: savedMessage.content,
        senderId: userId,
        receiverId: peerId,
        createdAt: savedMessage.createdAt,
        room,
    };

    await redis.zadd(keys.recent(room), Date.now(), JSON.stringify(messageData));
    await redis.zremrangebyrank(keys.recent(room), 0, -101);

    socket.emit("ack", { tempId, id: savedMessage.id, createdAt: savedMessage.createdAt });
    socket.to(room).emit("receive", messageData);

}

export const handleTyping = async (socket: Socket, userId: number, peerId: number, isTyping: boolean) => {

    const room = `dm:${Math.min(userId, peerId)}:${Math.max(userId, peerId)}`;
    socket.to(room).emit("typing", { userId, isTyping });
    
}

export const markAsRead = async (socket: Socket, userId: number, peerId: number, messageIds: number[]) => {

    const room = `dm:${Math.min(userId, peerId)}:${Math.max(userId, peerId)}`;
    await TMessage.update(messageIds, { readAt: moment().format() });
    socket.to(room).emit("read", { room, messageIds, by: userId });

}