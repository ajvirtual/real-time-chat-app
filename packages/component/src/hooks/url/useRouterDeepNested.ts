import { AppRouteProps } from "../../containers"
import { useCallback } from "react";
import { useRouterDeclaration } from "./useRouterDeclaration";

export const useRouterDeepNested = () => {

    const getRouteDeclaration = useRouterDeclaration()

    const matchUrl = useCallback((routes: Array<AppRouteProps>, path: string ) => {

        const _routes = path.split('/').map((item) => item === '' ? '/' : item)
        const result = _routes.map((item, index) => {
            const _path = `${[..._routes].slice(0, index).join('/')}/${item}`.replace('//', '/')
            const route = getRouteDeclaration(routes, _path)
            let title = ""
            title = route?.title
            path = route?.path ? _path : ''
            
            return { 
                title: title,
                path: path
            }
        })
        
        return result.reverse().filter((item, index): item is { title: string, path: string } => {
            const differentPath = result[index + 1]?.path !== item?.path
            
            return differentPath 
        })
    }, [])
 
    return matchUrl
}
