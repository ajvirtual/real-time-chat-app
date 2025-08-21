import { AppRouteProps } from "containers"
import { AppRouteMetadata } from "containers/AppRoutes"
import _ from "lodash"
import { useCallback } from "react"
import { useRouterDeclaration } from "./useRouterDeclaration"

export const useRouterMetadata = () => {

    const getRouteDeclaration = useRouterDeclaration()

    return useCallback((routes: Array<AppRouteProps>, path: string): AppRouteMetadata | undefined => {
        const route = getRouteDeclaration(routes, path)
        return route ? _.pick(route, ['title', 'description']) : undefined
    }, [])
}
