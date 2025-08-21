import { useCallback } from "react"

/**
 * Encode a JSON object to url params string
 */
export const useUrlParamsEncode = () => {

    return useCallback((data?: Record<string, any>) : string => {
        let str = ''
     
        for(var prop in data){
            if(Array.isArray(data[prop])){
                 const adr = data[prop] as Array<string>
                 adr.forEach((item: string) => {
                     const val = typeof item === 'string' ? encodeURIComponent(item) : JSON.stringify(item)
                     str += `${prop}[]=${val}&`
                 })
            }
            else if (data[prop] !== undefined && data[prop] !== null) {
                const val = typeof data[prop] === 'string' ? encodeURIComponent(data[prop]) : JSON.stringify(data[prop])
                str += `${prop}=${val}&`
            }
        }
     
        return str.substring(0, str.length - 1)
    }, [])
}
