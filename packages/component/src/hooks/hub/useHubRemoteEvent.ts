import { useEffect } from "react"
import { useHub } from "./useHub"
import { HubEventCallback, WebSocketEvent } from "@chat/lib"

export const useHubRemoteEvent = (event: Pick<WebSocketEvent, 'entity' | 'entityId'>, callback: HubEventCallback) => {

    const hub = useHub()
    useEffect(() => {
        hub?.sendEvent({
            type: 'REGISTER',
            ...event,
        })
        hub?.addEventListener(callback)
        return () => {
            hub?.sendEvent({
                type: 'REMOVE',
                ...event,
            })
            hub?.removeEventListener(callback)
        }
    }, [hub, callback])
}
