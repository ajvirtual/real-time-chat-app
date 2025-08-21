import Avatar from "avatar-initials"
import { useMemo } from "react"
import { useFileUrl } from "../assets"
import { useRuntimeEnv } from "./useRuntimeEnv"

export const useRuntimeEnvUserProfile = () => {

    const fileUrl = useFileUrl()
    const {runtimeEnv} = useRuntimeEnv()

    return useMemo(() => {
        return runtimeEnv?.user?.profilePicture?.id
            ? fileUrl(runtimeEnv.user.profilePicture?.id)
            : Avatar.gravatarUrl({
                email: runtimeEnv?.user?.email,
              })
    }, [runtimeEnv])
}
