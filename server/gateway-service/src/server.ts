import express, { Express } from 'express';
import { ENV, getExpressApp, useCreateDataSource } from '@chat/context';
import http from 'http'
import { createProxyMiddleware } from 'http-proxy-middleware'
import compression from 'compression'
import { getReverseProxy } from 'ReverseProxy';
import { getControllerImport } from 'ControllerImport';
import { getDataSource } from 'DataSource';
import { attachSocket } from 'chat-infra/ws/socket';

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        return false
    }

    // fallback to standard filter function
    return compression.filter(req, res)
}

const initServer = async (app: Express) => {
    /**
     * Express
     */
    const server = http.createServer(app)
    
    // websocket chat initialisation
    attachSocket(server);

    server.on('error', (error: any) => {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const address = server.address();
        const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + app.get('port');
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges.');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use.');
                process.exit(1);
                break;
            default:
                console.error('[Server] error', error);
                throw error;
        }
    });
    server.on('listening', () => {
        const address = server.address();
        const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + app.get('port');
        console.log(`🚀 Server ready at ${bind}`);
    });

    server.listen(app.get('port'));
}

export const bootstrap = async () => {

    const app = await getExpressApp({
        port: ENV.SERVER_GATEWAY_PORT
    })

    app.use(compression({ filter: shouldCompress }))
    if (ENV.NODE_ENV === 'production') {
        getReverseProxy(app)
    } else {
        await getDataSource()
        await getControllerImport(app)
    }
    
    await initServer(app)
}

bootstrap()
