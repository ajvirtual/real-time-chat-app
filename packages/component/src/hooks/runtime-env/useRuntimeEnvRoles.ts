import { useAjax, useMzQuery } from ".."

export const useRuntimeEnvRoles = (suspense?: boolean) => {

    const ajax = useAjax()
    return useMzQuery<RoleValues>(
        'User.Runtime.Env.Roles', 
        async () => await ajax.get_json('paying/acl') as Promise<RoleValues>, 
        { suspense, refetchOnMount: false, enabled: !!suspense }
    )
}

type RoleValues = Array<string>
