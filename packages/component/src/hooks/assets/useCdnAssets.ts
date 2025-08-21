import { useCallback } from "react"

/**
 * Hooks to get link of file inside CDN server
 */
export const useCdnAssets = () => {
    return useCallback((path?: string) => `${process.env.REACT_APP_CDN}${path}`, [])
}
