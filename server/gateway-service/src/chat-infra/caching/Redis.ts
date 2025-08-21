import IORedis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const prefix = process.env.REDIS_PREFIX || "chatapp:";

export const redis = new IORedis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT || 6379),
    password: process.env.REDIS_PASSWORD || undefined,
    keyPrefix: prefix,
});

export const redisSub = new IORedis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT || 6379),
    password: process.env.REDIS_PASSWORD || undefined,
    keyPrefix: prefix,
});

// Keys helpers
export const keys = {
    presence: (userId: number) => `presence:user:${userId}`, // string "online"|"offline"
    socketsByUser: (userId: number) => `sockets:user:${userId}`, // set
    typing: (room: string, userId: number) => `typing:${room}:${userId}`, // string TTL
    recent: (room: string) => `recent:${room}`, // zset score=timestamp, value=JSON
};