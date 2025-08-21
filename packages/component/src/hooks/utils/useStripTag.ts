import { useCallback } from "react"

export const useStripTag = () => {

    return useCallback((str: string) => {
        return str.replace(/(<([^>]+)>)/gi, "")
    }, [])
}
