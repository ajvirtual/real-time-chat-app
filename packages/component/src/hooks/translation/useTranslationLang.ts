import { useCallback, useEffect, useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const useTranslationLang = (): UseTranslationLang  => {

    const navigate = useNavigate()
    const location = useLocation()
    const supportedLanguages = useMemo(() => process.env.REACT_APP_LANG_SUPPORTED?.split(',') || [], [])
    const lang = useMemo(() => location.pathname.split('/')[1], [location])

    useEffect(() => {
        if (!lang) {
            initializeLang()
        }

        if (lang && !supportedLanguages.includes(lang)) {
            setDefaultLang()
        }
    }, [location])

    const getTranslatedRoute = useCallback((value: string) => {
        let url = `/${value}`
        if (location.pathname !== '/') {
            url += `/${location.pathname.replace(lang || '', '').replace(/^\/+/, '')}`
        }
        if (location.search) {
            url += `?${location.search}`
        }

        return url
    }, [lang, location])

    
    const setLang = useCallback((value: string) => {
        const url = getTranslatedRoute(value)
        navigate(url, { replace: true })
    }, [lang, getTranslatedRoute])

    const initializeLang = useCallback(() => {
        const [activeLang] = navigator.language?.split('-') || []
        if (supportedLanguages.includes(activeLang)) {
            setLang(activeLang)
            return;
        }

        if (!supportedLanguages.includes(activeLang)) {
            setDefaultLang()
        }

        if (supportedLanguages.length === 0 && !process.env.REACT_APP_LANG_FALLBACK) {
            console.warn('Language parameters is not correct, REACT_APP_LANG_SUPPORTED and REACT_APP_LANG_FALLBACK are empty')
        }
    }, [setLang])

    const setDefaultLang = useCallback(() => {
        setLang(process.env.REACT_APP_LANG_FALLBACK || supportedLanguages[0])
    }, [setLang])

    return {
        lang,
        setLang,
        getTranslatedRoute
    }
}

export type UseTranslationLang = {
    lang: string | undefined
    setLang: (value: string) => void
    getTranslatedRoute: (value: string) => string
}
