import { useRuntimeEnv } from "./useRuntimeEnv"

export const useCheckUserLoggedIn = (suspense?: boolean, enabled?: boolean) => {
    const { runtimeEnv } = useRuntimeEnv(suspense, enabled)
    return runtimeEnv?.authenticated
}
