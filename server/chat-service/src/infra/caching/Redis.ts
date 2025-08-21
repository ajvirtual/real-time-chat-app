import IORedis from "ioredis";
import dotenv from "dotenv";
import { ENV } from "@chat/context";
dotenv.config();

const prefix = ENV.REDIS_PREFIX || "chatapp:";

export const redis = new IORedis({
    host: ENV.REDIS_HOST,
    port: Number(ENV.REDIS_PORT || 6379),
    password: ENV.REDIS_PASSWORD || undefined,
    keyPrefix: prefix,
});

export const redisSub = new IORedis({
    host: ENV.REDIS_HOST,
    port: Number(ENV.REDIS_PORT || 6379),
    password: ENV.REDIS_PASSWORD || undefined,
    keyPrefix: prefix,
});

export const keys = {
    presence: (userId: number) => `presence:user:${userId}`, // string "online"|"offline"
    socketsByUser: (userId: number) => `sockets:user:${userId}`, // set
    typing: (room: string, userId: number) => `typing:${room}:${userId}`, // string TTL
    recent: (room: string) => `recent:${room}`, // zset score=timestamp, value=JSON
};