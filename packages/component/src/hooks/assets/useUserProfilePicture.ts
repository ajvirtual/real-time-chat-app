import { useCallback } from "react"

export const useUserProfilePicture = () => {
    return useCallback((id: number | string) => `${process.env.REACT_APP_API_ENDPT}user/image/profile/${id}`, [])
}
