import { useCallback } from "react"
import { useTranslationLoad } from "./useTranslationLoad"

export const useTranslation = () => {
    const { data } = useTranslationLoad(false, process.env.NODE_ENV === 'test')
    return useCallback((key: string) => {
        return data?.[key] || key
    }, [data])
}
