import { useCallback } from "react"
import { useRuntimeEnvRoles } from "./useRuntimeEnvRoles"

export const useRuntimeEnvRolesIncludes = (suspense?: boolean) => {

    const { data } = useRuntimeEnvRoles(suspense)
    return useCallback((role: string | Array<string>) => {
        if (Array.isArray(role)) {
            return data?.some((item) => role.includes(item))
        }
        return data?.includes(role)
    }, [data])
}
