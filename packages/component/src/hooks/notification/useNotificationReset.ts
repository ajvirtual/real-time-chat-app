import { useGraphqlMutation } from "@hooks/query/useGraphqlMutation";
import { TNotification } from "@chat/graphql";
import { useCallback } from "react";
import { useNotificationCountQuery } from "./useNotificationCountQuery";
import { useNotificationWebsocketDispatch } from "./useNotificationWebsocketDispatch";
import moment from "moment";

export const useNotificationReset = () => {

    const query = useNotificationCountQuery()
    const mutation = useGraphqlMutation<TNotification>(gql)
    const dispatch = useNotificationWebsocketDispatch()

    return useCallback((ids: Array<number>) => {
        mutation.mutate({
            datas: ids.map((id) => ({ id, dateOpened: moment().format() }))
        }, {
            onSuccess: () => {
                query.invalidateQuery()
                dispatch()
            }
        })
    }, [query])
}

const gql = `
    mutation ($datas: [JSONObject!]){
        saveNotification(data: { datas: $datas }) {
            id
        }
    }
`;
