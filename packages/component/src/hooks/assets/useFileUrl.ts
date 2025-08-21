import { useCallback } from "react"

export const useFileUrl = () => {
    return useCallback((id: number | string) => `${process.env.REACT_APP_API_ENDPT}file/download/${id}`, [])
}
