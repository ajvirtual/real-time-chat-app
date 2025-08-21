import _ from "lodash"
import { useCallback } from "react"

/**
 * Decode an url params string to JSON object
 * It's not recommended to use it directly, use "useUrlParamsValue" or "useUrlParamsState" instead to get the JSON from the url
 */
export const useUrlParamsDecode = () => {

    const isJsonString = useCallback((str: string): boolean => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }, [])

    const getValue = useCallback((value: string) => {
        if (isJsonString(value)) {
            return JSON.parse(value)
        }

        if (['true', 'false'].includes(value)) {
            return value === 'true'
        }

        return value
    }, [])

    return useCallback((uri: string) => {
        const match = uri.match(/\?(.*)$/)
        const search_params = new URLSearchParams(match?.[1] || '')
        const result = {}
        search_params.forEach((value: string, key: string, parent: URLSearchParams) => {
            if (/^http/.test(key)) {
                return;
            }
            
            result[key.replace(/\[\]$/, '')] = /\[\]$/.test(key) 
                ? parent.getAll(key).map((item) => getValue(item))
                : getValue(value)
        })
        return result
    }, [])
}
