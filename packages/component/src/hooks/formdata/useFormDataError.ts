import _ from "lodash"
import { useCallback, useMemo } from "react"
import { useGlobalFormDataError } from "./useGlobalFormDataError"

export const useFormDataError = (id: string) => {
    const [errors] = useGlobalFormDataError(id)

    const getError = useCallback((name: string) => {
        return errors?.[name]
    }, [errors])

    const hasError = useMemo((): boolean => {
        return !_.isEmpty(errors)
    }, [errors])

    return {
        getError,
        hasError
    }
}
