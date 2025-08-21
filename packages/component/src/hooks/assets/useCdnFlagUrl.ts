import { useCallback } from "react"
import { useCdnAssets } from "./useCdnAssets"

export const useCdnFlagUrl = () => {
    const cdn = useCdnAssets()
    return useCallback((zone?: string) => {
        if (zone === 'EN') zone = 'US'
        return cdn(`img/flag/24x24/${zone}.png`) 
    }, [])
}
