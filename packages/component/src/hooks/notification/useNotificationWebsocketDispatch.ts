import { useHubDispatchEvent } from "@hooks/hub"
import { useCallback } from "react"


export const useNotificationWebsocketDispatch = () => {

    const dispatch = useHubDispatchEvent()
    
    return useCallback(() => {
        dispatch({
            type: 'DISPATCH',
            entity: 'TNotification',
            message: 'NOTIFICATION'
        })
    }, [dispatch])
}
