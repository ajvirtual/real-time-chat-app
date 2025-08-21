import { useCallback, useEffect } from "react"
import { useHub } from "./useHub"
import {  WebSocketEvent } from "@chat/lib"

export const useHubDispatchEvent = () => {

    const hub = useHub()

    return useCallback((event: Pick<WebSocketEvent, 'type' | 'entity' | 'entityId' | 'message'>) => {
        console.log(`[Websocket] Send event`, event)
        hub?.sendEvent({
            type: 'REGISTER',
            ...event,
        })
    }, [])
}
