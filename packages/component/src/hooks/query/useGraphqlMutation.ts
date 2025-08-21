import { useAjax } from "@hooks/ajax/useAjax"
import { useMzMutation, UseMzMutationOptions } from "./useMzMutation"
// import { useMonitorQuery } from "./useMonitorQuery"

export const useGraphqlMutation = <TData=any, TVariables extends object | unknown | undefined = unknown>(
    gql: string, 
    config?: UseMzMutationOptions<TData, TVariables>) => {
    const ajax = useAjax()
    return useMzMutation<TData, TVariables>(async (data) => {
        const response = await ajax.graphql(gql, data as any)
        return response as TData
    }, config)
}
