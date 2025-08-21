import { useEffect } from "react"
import { useHub } from "./useHub"
import { HubEventCallback } from "@chat/lib"

export const useHubEventListner = (callback: HubEventCallback) => {

    const hub = useHub()
    useEffect(() => {
        hub?.addEventListener(callback)
        return () => {
            hub?.removeEventListener(callback)
        }
    }, [])
}
