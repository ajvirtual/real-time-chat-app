import { AppRouteProps } from "containers";
import { useCallback } from "react";
import { matchPath, matchRoutes } from "react-router-dom";

export const useRouterDeclaration = () => {

    const matchUrl = useCallback((routes: Array<AppRouteProps>, path: string, defaultPath?: string): AppRouteProps | undefined => {
        const match = matchRoutes(routes, {
            pathname: path,
        })
        
        return match?.find(item => !!matchPath(item?.pathname, path || ''))?.route
    }, [])

    return matchUrl
}
