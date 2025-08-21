import { TSessionUser } from "@chat/graphql"
import { useAjax, useMzQuery } from ".."

export const useRuntimeEnv = (suspense?: boolean, enabled?: boolean) => {

    const ajax = useAjax()
    const { data, invalidateQuery } = useMzQuery<TSessionUser>('User.Runtime.Env', async () => {
        try {
            return await ajax.get_json('session/env') as Promise<TSessionUser>
        } catch (e) {
            if (e.xhr.status === 401) {
                ajax.clear_token()
                window.location.reload()
                return;
            }

            throw e
        }
    }, { suspense, enabled, refetchOnMount: false })

    return {
        runtimeEnv: data,
        invalidateQuery
    }
}
