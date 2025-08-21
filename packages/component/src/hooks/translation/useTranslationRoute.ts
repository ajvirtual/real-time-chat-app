import { useCallback } from "react"

export const useTranslationRoute = () => {

    return useCallback((route: string) => {
        return `/${route}`
    }, [])
}
