import { AppRouteMetadata } from "containers/AppRoutes"

export const useDocumentMetadata = () => {
    const setDocumentTitle = (value: string) => {
        document.title = value
    }

    const setMetadata = (key: string, value: string, type = 'name') => {
        const el = document.querySelector(`meta[${type}="${key}"]`)
        if (!el) {
            const metadata = document.createElement('meta')
            metadata.setAttribute(type, key)
            metadata.setAttribute('content', value)
            document.head.append(metadata)
            return;
        }
        el.setAttribute("content", value)
    }

    const setDocumentMetadata = (obj: AppRouteMetadata) => {
        if (obj) {
            if (obj.title) {
                setDocumentTitle(obj.title)
                setMetadata('og:title', obj.title, 'property')
            }
            
            if (obj.description) {
                setMetadata('description', obj.description || '')
                setMetadata('og:description', obj.description || '', 'property')
            }

            setMetadata('og:url', window.location.href, 'property')
            setMetadata('og:type', obj.type || '', 'property')
            
            if (obj.keywords) {
                setMetadata('og:keywords', obj.keywords || '', 'property')
                setMetadata('keywords', obj.keywords || '')
            }
        }
    }

    return {
        setDocumentMetadata,
        setMetadata
    }
}
