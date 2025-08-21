import { useRef } from "react"

/**
 * Debounce hook
 */
export const useDebounce = () => {
    const debounceRef = useRef<NodeJS.Timeout>()

    const debounce = (callback: any, timeout: number, args?: any[]) => {
        clearTimeout(debounceRef.current as NodeJS.Timeout)
        debounceRef.current = setTimeout(callback, timeout, args) as any
    }

    return debounce
}
