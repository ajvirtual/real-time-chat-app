import { useGraphqlQuery } from "@hooks/query/useGraphqlQuery"
import { NotificationCountQuery, NotificationCountResult } from "./NotificationCountQuery"

export const useNotificationCountQuery = () => {
    return useGraphqlQuery<NotificationCountQuery, NotificationCountResult>(new NotificationCountQuery(), {
        error_message: false,
        retry: 1
    })
}
