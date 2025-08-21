import _ from "lodash";
import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUrlParamsEncode } from "./useUrlParamsEncode";
import { useUrlParamsValue } from "./useUrlParamsValue"

export const useUrlParamsState = <TValue extends object = Record<string, any>>(defaultValue?: TValue) => {

    const urlParamsValue = useUrlParamsValue<TValue>()
    const location = useLocation();
    const navigate = useNavigate()
    const encode = useUrlParamsEncode()

    useEffect(() => {
        if (defaultValue && _.isEmpty(urlParamsValue)) {
            navigate(`${location.pathname}?${encode({ ...defaultValue, ...urlParamsValue })}`, { replace: true })
        }
    }, [])

    const setUrlParams = useCallback((key: string | SetUrlParamsCallback<TValue>, value?: any) => {
        let newValue: TValue = urlParamsValue
        if (typeof key === 'string') {
            newValue = { ...urlParamsValue, [key]: value }
        }
        else if (typeof key === 'function'){
            newValue = key(_.cloneDeep(urlParamsValue))
        }

        if (!_.isEqual(urlParamsValue, newValue)) {
            navigate(`${location.pathname}?${encode(newValue)}`)
        }
    }, [urlParamsValue])

    return {
        urlParams: urlParamsValue,
        setUrlParams
    }
}

export type SetUrlParamsCallback<TValue> = (prevValue: TValue) => TValue
