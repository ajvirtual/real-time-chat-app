import { AlertProps } from "@components/alert";
import { useDisplayAlert } from "@hooks/alert/useDisplayAlert";
import { useCallback, useEffect, useRef } from "react";
import { QueryKey, UseMutationResult, UseQueryResult } from "react-query";
import { QueryErrorType, QueryLoadingType, QuerySuccessType } from "./useMzQuery";
import { useRemoveAlert } from "@hooks/alert/useRemoveAlert";
import _ from "lodash";
import { try_parse_json } from "@chat/lib";

/**
 * Hooks to monitor query
 * If there's error, it will show a snackbar error on the Layout
 * If there's success, it will show a snackbar success on the layout
 * These messages are customizable usign config parameter
 */
export const useMonitorQuery = 
    <TData, TError = any>(query: UseQueryResult<TData, TError> | UseMutationResult<TData, TError>,
                    config?: UseMonitorQueryConfig<TData, TError>,
                    queryKey?: QueryKey) => {
    const addAlert = useDisplayAlert()
    const removeAlert = useRemoveAlert()

    useEffect(() => {
        if (query.isError && config?.error_message !== false) {
            addAlert(getErrorAlert())
        }
    }, [query.isError, query.error])

    useEffect(() => {
        if (query.isSuccess && config?.success_message) {
            addAlert(getSuccessAlert())
        }
        
    }, [query.isSuccess])

    useEffect(() => {
        if (query?.isLoading && (config?.showLoadingMessage || config?.navigation_loading_monitor)) {
            addAlert(getLoadingAlert())
        } else {
            removeAlert(getLoadingAlert())
        }
    }, [query?.isLoading])
    
    const getErrorAlert = useCallback((): AlertProps => {
        return {
            id: getAlertId(),
            text: getErrorAlertLabel(),
            dismissTimeout: 10000,
            type: 'danger'
        }
    }, [query.error, config])

    const getSuccessAlert = useCallback((): AlertProps => {
        return {
            id: getAlertId(),
            text:  getSuccessAlertLabel(),
            dismissTimeout: 5000,
            type: 'success'
        }
    }, [query.error, config])

    const getLoadingAlert = useCallback((): AlertProps => ({
        id: getAlertId(),
        text: getLoadingAlertLabel(),
        dismissTimeout: 0,
        type: 'default',
        isDismissible: false,
    }), [query])

    const getAlertId = useCallback(() => {
        return JSON.stringify((query as UseMutationResult).variables || queryKey)
    }, [query, queryKey])

    const getLoadingAlertLabel = useCallback(() => {
        if (config?.loadingMessage) {
            return config?.loadingMessage
        }
        return 'Generic.Loading.label'
    }, [config])
    
    const getErrorAlertLabel = useCallback(() => {
        if (config?.transformErrorMessage) {
            const responseJson = typeof (query.error as any).response === 'string' ? try_parse_json((query.error as any).response) : query.error
            return config?.transformErrorMessage?.(responseJson as TError || undefined)
        }
            
        if (typeof config?.error_message === 'string') {
            return config?.error_message
        }
        
        if ((query.error as any)?.message === 'Network request failed') {
            return `Generic.Exception.ServerUnreachable`
        }

        if ((query.error as any)?.response?.errors?.[0]?.message) {
            const message = (query.error as any)?.response?.errors?.[0]?.message
            let code = /^([A-Z_]+)$/.test(message) ? message : message.match(/"([A-Z_]+)"/)?.[1]
            return `Exception.Graphql.${code}`
        }
        
        return 'UNEXPECTED ERROR'
    }, [config, query.error])

    const getSuccessAlertLabel = useCallback(() => {
        if (config?.transformSuccessMessage) {
            return config?.transformSuccessMessage?.(query.data)
        }

        if (typeof config?.success_message === 'string') {
            return config?.success_message
        }
        
        return 'Generic.Saved.Successfully.label'
    }, [config, query.data])
}

export type UseMonitorQueryConfig<TData, TError = any> = {
    /** 
     * flag telling if we send request
     * @deprecated use enabled instead
     */
    send_request?: boolean
    /** 
     * @deprecated Use "show_loading_message" instead
     * Flag telling to navigation to show an alert of loading when react-query is fetching data 
     */
    navigation_loading_monitor?: boolean
}
    & QueryErrorType<TError>
    & QuerySuccessType<TData>
    & QueryLoadingType<TData>
