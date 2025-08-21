import { GraphQLQueryClass } from "@hooks/query/useGraphqlQuery";
import { TBookmark } from "@chat/graphql";

export class NotificationCountQuery implements GraphQLQueryClass<NotificationCountResult> {
    public queryKey: string = 'App.NotificationCountQuery'

    public gql: string = `
        query NotificationCountQuery {
            notificationCount (
                filter: {
                    data: { dateOpened_isNull: true, dateRead_isNull: true }
                }
            )
        }
    `
    

    public mapFn(data?: Record<string, any>): NotificationCountResult {
        return {
            count: data?.notificationCount ?? 0
        }
    };
}

export type NotificationCountResult = {
    count: number
}

