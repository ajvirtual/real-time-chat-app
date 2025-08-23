import 'reflect-metadata';
import express, { Express, IRouterHandler, Router } from 'express';
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ENV } from './config/env';
import { corsMiddleware } from './middleware';
import { useCreateDataSource } from './db';

export const getExpressApp = (props: AppProps): Express => {
    const app = express();
    // Middleware
    app.use(express.json({ limit: `${ENV.PAYLOAD_SIZE_LIMIT || 1}mb` }));
    app.use(bodyParser.json())
    app.use(corsMiddleware)
    app.use(
        cors({
            origin: ENV.CLIENT_URL || 'http://localhost', // Replace with your client URL
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true, // Allow cookies and credentials
        })
    );
    app.use((req, res, next) => {
        console.log(`[CORS Debug] Origin: ${req.headers.origin}`);
        next();
    });
    props.middlewares?.forEach((item) => app.use(item as any))
    // Routes
    props.controllers && app.use(props.controllers)
    // Ops
    app.set('port', props.port)
    return app
}


const initServer = async (app: Express, props: AppProps) => {
    /**
     * Express
     */
    const server = http.createServer(app)

    await props.onBeforeLaunch?.(app)

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
                throw error;
        }
    });
    server.on('listening', () => {
        const address = server.address();
        const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + app.get('port');
        console.log(`🚀 Server ready at ${bind}`);
    });

    server.listen(app.get('port'));
    return server
}

export const bootstrap = async (props: AppProps) => {
    const app = getExpressApp(props)
    await useCreateDataSource({
        host: ENV.DB_HOST,
        port: +ENV.DB_PORT,
        username: ENV.DB_USER,
        password: ENV.DB_PASSWORD || '',
        database: ENV.DB_NAME,
    }, props.runMigration)
    const server = await initServer(app, props)
    return server
}

export type AppProps = {
    controllers?: Router
    middlewares?: Array<IRouterHandler<any>>
    port?: string | number
    /**
     * It should be just "graphql-service" who can run migration
     */
    runMigration?: boolean
    onBeforeLaunch?: (app: Express) => void | Promise<void>
}
