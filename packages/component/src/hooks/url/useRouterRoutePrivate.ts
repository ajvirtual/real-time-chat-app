import _ from "lodash"
import { useCallback } from "react"
import { useRouterDeclaration } from "./useRouterDeclaration"
import { useRouterRoutes } from "./useRouterRoutes"

export const useRouterRoutePrivate = () => {

    const routes = useRouterRoutes()
    const getRouteDeclaration = useRouterDeclaration()

    return useCallback((path: string) => {
        const route = getRouteDeclaration(routes, path)
        return route?.private
    }, [routes])
}
