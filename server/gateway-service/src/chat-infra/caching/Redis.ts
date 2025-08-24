import IORedis from "ioredis";
import dotenv from "dotenv";
import { spawn } from "child_process";
import path from "path";
dotenv.config();

const prefix = process.env.REDIS_PREFIX || "chatapp:";

const startRedisServer = () => {
    const configPath = path.resolve(__dirname, "../../../redis.conf");
    const redisProcess = spawn("redis-server", [configPath]);

    redisProcess.stdout.on("data", (data) => {
        console.log(`[Redis] ${data}`);
    });

    redisProcess.stderr.on("data", (data) => {
        console.error(`[Redis Error] ${data}`);
    });

    redisProcess.on("close", (code) => {
        console.log(`[Redis] Process exited with code ${code}`);
    });

    return redisProcess;
};

// Start Redis server
startRedisServer();

export const redis = new IORedis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT || 6380),
    password: process.env.REDIS_PASSWORD || undefined,
    keyPrefix: prefix,
});

export const redisSub = new IORedis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT || 6380),
    password: process.env.REDIS_PASSWORD || undefined,
    keyPrefix: prefix,
});

// Keys helpers
export const keys = {
    presence: (userId: number) => `presence:user:${userId}`, // string "online"|"offline"
    socketsByUser: (userId: number) => `sockets:user:${userId}`, // set
    typing: (room: string, userId: number) => `typing:${room}:${userId}`, // string TTL
    recent: (room: string) => `recent:${room}`, // zset score=timestamp, value=JSON
    messageScore: (room: string, messageId: number) => `msg_score:${room}:${messageId}`,
    active: (userId: number) => `user:${userId}:active`, // string "1" with TTL
}