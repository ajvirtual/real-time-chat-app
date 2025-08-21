import { useCallback } from "react"
import { AppRouteProps } from "../../containers"
import { useRuntimeEnvRoles } from "../runtime-env/useRuntimeEnvRoles"
import { useRouterDeclaration } from "./useRouterDeclaration"
import { useRouterRoutes } from "./useRouterRoutes"
import _ from "lodash"

export const useRouterFilteredRoute = () => {

    const { data } = useRuntimeEnvRoles(true)

    const getRouteDeclaration = useRouterDeclaration()

    const routes = useRouterRoutes()

    return useCallback((path: string) => {

        const route = getRouteDeclaration((routes as Array<AppRouteProps>), path)

        if (!_.isEmpty((route as AppRouteProps)?.roles)) {

            return (route as AppRouteProps)?.roles?.some(role => data?.includes(role))

        }
        return true

    }, [])

}