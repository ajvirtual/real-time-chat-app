import { useCallback } from "react"
import { QueryFunction, QueryKey, useQuery, useQueryClient, UseQueryOptions, UseQueryResult } from "react-query"
import { useMonitorQuery } from "./useMonitorQuery"

export const useMzQuery = <TData=any>(
    query_key: QueryKey, 
    query_fn: QueryFunction<TData>,
    config?: UseMzQueryOptions<TData>): UseMzQuery<TData, any> => {
    
    const query_client = useQueryClient()
    const query = useQuery(query_key, query_fn, {
        ...config
    })

    const invalidate_cache = useCallback(() => {
        query_client.invalidateQueries(query_key)
    }, [query_key])

    const remove_cache = useCallback(() => {
        query_client.removeQueries(query_key)
    }, [query_key])

    const reset_cache = useCallback(() => {
        query_client.resetQueries(query_key)
    }, [query_key])

    // wait for useDisplayAlert
    useMonitorQuery(query, {
        error_message: true,
        ...config,
    }, query_key)

    return {
        ...query,
        invalidate_cache,
        remove_cache,
        reset_cache,
        invalidateQuery: invalidate_cache,
        removeQuery: remove_cache,
        resetQuery: reset_cache
    }
}

export type UseMzQuery<TData, TError> = UseQueryResult<TData, TError> & {
    /** @deprecated */
    invalidate_cache: () => void
    /** @deprecated */
    remove_cache: () => void
    /** @deprecated */
    reset_cache: () => void
    invalidateQuery: () => void
    removeQuery: () => void
    resetQuery: () => void
}

export type UseMzQueryOptions<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData> = 
    UseQueryOptions<TQueryFnData, TError, TData> 
    & QueryMonitorType<TError, TData>

export type QueryMonitorType<TError = unknown, TData = unknown> = {
    /** 
     * flag telling if we send request
     * @deprecated use enabled instead
     */
    send_request?: boolean
    /** Flag telling to navigation to show an alert of loading when react-query is fetching data */
    navigation_loading_monitor?: boolean
} 
    & QueryErrorType<TError>
    & QuerySuccessType<TData>
    & QueryLoadingType<TData>

export type QueryErrorType<TError> = {
    /** Display an alert when error occured. It will invite the user to retry. */
    error_message?: string | boolean
    /** Action button label when error occured */
    error_action_label?: string
    /** 
     * Callback when user clicked on action button
     * If undefined, it hide the action button
     */
    onErrorActionClick?: () => void
    /** 
     * Callback that will try to transform error message to string 
     * Return undefined will fallback to generic message
     */
    transformErrorMessage?: (error?: TError) => string | undefined
    /** Flag telling to show error message when an error is occured */
    hide_error_message?: boolean
}

export type QuerySuccessType<TData> = {
    /** Display a success alert for a few seconds */
    success_message?: string | boolean
    /** Action button label when error occured */
    success_action_label?: string
    /** 
     * Callback when user clicked on action button
     * If undefined, it hide the action button
     */
    onSuccessActionClick?: () => void
    /** 
     * Callback that will try to transform error message to string
     * Return undefined will fallback to generic message
     */
    transformSuccessMessage?: (data?: TData) => string | undefined
}

export type QueryLoadingType<TData> = {
    showLoadingMessage?: boolean
    /** Display a success alert for a few seconds */
    loadingMessage?: string
    /** Action button label when error occured */
    loading_action_label?: string
    /** 
     * Callback when user clicked on action button
     * If undefined, it hide the action button
     */
    onLoadingActionClick?: () => void
    /** 
     * Callback that will try to transform error message to string
     * Return undefined will fallback to generic message
     */
    transformLoadingMessage?: (data?: TData) => string | undefined
}
