import { AppRouteProps } from "containers";
import { useCallback } from "react";
import { useRouterDeclaration } from "./useRouterDeclaration";

export const useRouterDeepNestedTitle = () => {

    const getRouteDeclaration = useRouterDeclaration()

    const matchUrl = useCallback((routes: Array<AppRouteProps>, path: string): string => {

        const _routes = path.split('/').map((item) => item === '' ? '/' : item)
        const result = _routes.map((item, index) => {
            const _path = `${[..._routes].slice(0, index).join('/')}/${item}`.replace('//', '/')
            const route = getRouteDeclaration(routes, _path)
            return route?.title
        })
        return result.reverse().filter((item, index): item is string => item !== undefined && result[index + 1] !== item).join(' - ')
    }, [])

    return matchUrl
}
