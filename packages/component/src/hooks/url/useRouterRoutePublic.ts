import _ from "lodash"
import { useCallback } from "react"
import { useRouterDeclaration } from "./useRouterDeclaration"
import { useRouterRoutes } from "./useRouterRoutes"

export const useRouterRoutePublic = () => {

    const routes = useRouterRoutes()
    const getRouteDeclaration = useRouterDeclaration()

    return useCallback((path: string) => {
        const route = getRouteDeclaration(routes, path)
        console.log(route, path)
        return route.public
    }, [routes])
}
