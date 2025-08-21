import _ from "lodash"
import { useEffect, useMemo } from "react"
import { useUrlParamsState } from ".."
import { useAjax } from "./useAjax"
import { useAjaxQueryToken } from "./useAjaxQueryToken"
import { useSetRecoilState } from "recoil"
import { AjaxState, buildAjax } from "@state/AjaxState"

export const useAjaxToken = () => {

    const ajax = useAjax()
    const setAjax = useSetRecoilState(AjaxState)
    const { urlParams, setUrlParams } = useUrlParamsState()
    
    const isQueryToken = useMemo(() => !_.isEmpty(urlParams._t), [urlParams])
    
    const { data: token } = useAjaxQueryToken(!Boolean(ajax.get_token()) && !isQueryToken)

    useEffect(() => {
        if (isQueryToken) {
            ajax.set_token(urlParams._t)
            setAjax(buildAjax())
            setUrlParams(() => _.omit(urlParams, '_t'))
        }
    }, [isQueryToken])

    useEffect(() => {
        if (token) {
            setUrlParams('_t', token)
            ajax.set_token(token as string)
            setAjax(buildAjax())
        }
    }, [token])
 
    return !isQueryToken && Boolean(ajax.get_token())
}
