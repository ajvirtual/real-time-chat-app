import { useAjax } from "@hooks/ajax/useAjax"
import { useCallback, useMemo } from "react"
import { UseMzQueryOptions, useMzQuery } from "./useMzQuery"

/**
 * 
 */
export const useGraphqlQuery = <TClass extends GraphQLQueryClass, TData = Record<string, any>>(
    query?: TClass,
    config?: UseMzQueryOptions<TData>) => {
    
    const ajax = useAjax()
    const queryKey = useMemo(() => [query?.queryKey, query?.variables], [query])
    
    const gqlFn = useCallback(async (): Promise<TData> => {
        try {
            const response: TData = await ajax.graphql(query?.gql!, query?.variables as any)
            return (query?.mapFn?.(response) as TData) || response
        } catch (e) {
            console.error(e)
            throw e
        }
        
    }, [query])

    return useMzQuery<TData>(queryKey, gqlFn, { ...config, enabled: Boolean(query) && config?.enabled })
}

export interface GraphQLQueryClass<TData extends object | undefined = object, TRawData = any, TVariables = any>  {

    queryKey: string

    gql: string

    variables?: TVariables

    mapFn?: (data: TRawData) => TData
}
