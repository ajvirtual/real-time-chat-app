import { useCallback } from "react"

export const useDocumentUpdateAlternativeLang = () => {

    return useCallback(() => {
        const url = window.location.href
        const supportedLanguage = process.env.REACT_APP_LANG_SUPPORTED?.split(',')
        const regExp = new RegExp(`${window.location.hostname.replace('/', '\\/')}${window.location.port ? `:${window.location.port}`: ''}\/([a-z]{2})`)
        supportedLanguage?.forEach((key) => {
            const el = document.querySelector(`link[rel=alternate][hreflang=${key}]`)
            const newUrl = url.replace(regExp, `${window.location.hostname}${window.location.port ? `:${window.location.port}`: ''}/${key}`)
            if (!el) {
                const link = document.createElement('link')
                link.setAttribute('rel', 'alternate')
                link.setAttribute('hreflang', key)
                link.setAttribute('href', newUrl)
                document.head.append(link)
            } else {
                el.setAttribute('href', newUrl)
            }
        })
    }, [])
}
