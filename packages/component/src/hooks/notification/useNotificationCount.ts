import { useMemo } from "react"
import { useNotificationCountQuery } from "./useNotificationCountQuery"
import { useHubRemoteEvent } from ".."
import { WebSocketEvent } from "@chat/lib"


export const useNotificationCount = () => {
    const query = useNotificationCountQuery()

    const handleHubMessage = (e: WebSocketEvent) => {
        query?.invalidateQuery()
    }

    useHubRemoteEvent({ entity: 'TNotification' }, handleHubMessage)

    return useMemo(() => query.data?.count, [query])
}
