import _ from "lodash"
import { useMemo } from "react"
import { useAjax } from ".."
import { useMzMutation, UseMzMutationOptions } from "./useMzMutation"

export const useGraphqlDelete = (entity: string, config?: UseMzMutationOptions<GraphqlDeleteData, GraphqlDeleteVariables>) => {

    const gql = useMemo(() => {
        return `
            mutation ($ids: [Float!]) {
                deleteResult: delete${_.upperFirst(entity)} (data: { ids: $ids })
            }
        `
    }, [])

    const ajax = useAjax()
    return useMzMutation<GraphqlDeleteData, GraphqlDeleteVariables>(async (data) => {
        const response = await ajax.graphql(gql, data)
        return response
    }, config)
}

export type GraphqlDeleteData = {
    deleteResult: boolean
}

export type GraphqlDeleteVariables = {
    ids: Array<number>
}
