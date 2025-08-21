import { ENV } from 'config/env';
import WebSocket from 'ws';

export const useWebSocketMessage = (payload: WebSocketPayload) => {
    let url = `ws://localhost:${ENV.SERVER_NOTIFICATION_PORT}/${ENV.SERVER_WEBSOCKET_SECRET}`;
    if (process.env.NODE_ENV !== "production") {
        url = `ws://localhost:${ENV.SERVER_GATEWAY_PORT}/${ENV.SERVER_WEBSOCKET_SECRET}`;

    }
    const client = new WebSocket(url);

    return new Promise<void>((resolve, reject) => {
        client.on('error', (e) => {
            console.log("[WebSocket] Connection Error: " + e.toString());
            reject(e)
        });

        client.on('open', function open() {
            setTimeout(() => {
                console.log("[WebSocket] Send: " + JSON.stringify(payload));
                client.send(JSON.stringify({
                    ...payload,
                    type: 'DISPATCH',
                }), (e) => {
                    if (e) {
                        console.log('send error', e)
                        reject(e)
                        return;
                    }
                    client.close()
                    resolve()
                });
            }, 750)
        });
    })
}

export type WebSocketPayload = {
    entity: string
    entityId?: string
    userId?: number
    message: string
    websocketUrl?: string
}
