
export class Hub {

    token: string

    host: string

    connexion?: WebSocket

    events: Array<HubEventCallback> = []

    constructor(host: string, token: string) {
        this.host = `${host}${!/\/$/.test(host) ? '/' : ''}`
        this.token = token
        if (!this.host) {
            console.log(`[Websocket] unable to use websocket. host is invalid.`)
            return;
        }

        if (!this.token) {
            console.log(`[Websocket] unable to use websocket. token is missing`)
            return;
        }

        this.initWebsocket()
    }

    handleMessage = (e: MessageEvent) => {
        const data: WebSocketEvent  = JSON.parse(e.data)
        this.dispatchEvent(data)
    }

    handleConnexionLost = () => {
        setTimeout(() => {
			this.initWebsocket()
		}, 5000)
    }

    async initWebsocket(){

		if (this.connexion) {
			this.connexion.close()
		}

		if (!this.connexion || (this.connexion && this.connexion?.readyState !== 1)) {
            console.log(`[Websocket] Init`)
			this.connexion = new WebSocket(`${this.host}${this.token}`)
            this.connexion.onopen = () => console.log(`[Websocket] Opened`)
			this.connexion.onmessage = (e) => this.handleMessage(e)
			this.connexion.onclose = (e) => {
                console.log(`[Websocket] Closed`, e)
                this.handleConnexionLost()
            }
		}
	}

    addEventListener(callback: HubEventCallback){
        this.events.push(callback)
    }

    removeEventListener(callback: HubEventCallback) {
        const index = this.events.findIndex((item) => item === callback)
        index !== -1 && this.events.splice(index, 1)
    }

    private dispatchEvent(e: WebSocketEvent){
        this.events.forEach((callback) => {
            callback?.(e)
        })
    }

    sendEvent(data: WebSocketEvent){
        if (this.connexion?.readyState !== 1) {
            console.error('[Websocket] unable to send event. Connexion is not established')
            return;
        }

        this.connexion.send(JSON.stringify(data))
    }

	dispose(){
		this.connexion?.close()
	}

}

export type WebSocketEvent = {
    type: 'REGISTER' | 'REMOVE' | 'DISPATCH'
    entity: string
    entityId?: string
    userId?: number
    message?: string
}

export type HubEventCallback = (e: WebSocketEvent) => void
