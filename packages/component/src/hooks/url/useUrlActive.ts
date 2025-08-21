import { useCallback } from "react"
import { useLocation } from "react-router-dom"
import { useTranslationLang } from "../translation/useTranslationLang"

export const useUrlActive = () => {

    const { lang } = useTranslationLang()
    const location = useLocation()

    return useCallback((route: string) => {
        return (new RegExp(`^${route.replace('/', '\\/')}`)).test(location.pathname)
    }, [lang, location])
}