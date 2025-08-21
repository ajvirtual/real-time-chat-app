
import _ from "lodash"
import { useLocation } from "react-router-dom";
import { useUrlParamsDecode } from "./useUrlParamsDecode"

export const useUrlParamsValue = <TData = Record<string, any>>(): TData => {
    const decodeUrl = useUrlParamsDecode()
    const location = useLocation();
    return decodeUrl(`${location.pathname}${location.search}`) as TData
}

export type TUrlParamsValue = Record<string, any>
