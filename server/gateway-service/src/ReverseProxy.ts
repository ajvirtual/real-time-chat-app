import { ENV } from '@chat/context';
import { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const getReverseProxy = (app: Express) => {
    app.use('/graphql', createProxyMiddleware({
        target: `http://localhost:${ENV.SERVER_GRAPHQL_PORT}`,
        changeOrigin: true,
        secure: false,
    }))
    app.use('/user/**', createProxyMiddleware({
        target: `http://localhost:${ENV.SERVER_USER_PORT}`,
        changeOrigin: true,
        secure: false,
    }))
    app.use('/session/**', createProxyMiddleware({
        target: `http://localhost:${ENV.SERVER_USER_PORT}`,
        changeOrigin: true,
        secure: false,
    }))
    app.use('/file/**', createProxyMiddleware({
        target: `http://localhost:${ENV.SERVER_FILE_PORT}`,
        changeOrigin: true,
        secure: false,
    }))
    app.use('/document/**', createProxyMiddleware({
        target: `http://localhost:${ENV.SERVER_DOCUMENT_PORT}`,
        changeOrigin: true,
        secure: false,
    }))

}
