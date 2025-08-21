import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";


export const AppRoutes = ({ routes }: { routes: AppRouteProps[] }): React.ReactElement | null => useRoutes(routes)

export type AppRouteProps = Omit<RouteObject, 'children' | 'index'> & AppRouteMetadata & {
    /** Flag telling that the route is private */
    private?: boolean
    /**
     * Flag telling that the route is public
     * it work especially when AppShell.protectedRoutes=*
     */
    public?: boolean

    roles?: Array<string>

    children?: Array<AppRouteProps>
}

export type AppRouteMetadata = {
    title?: string
    description?: string
    type?: string
    keywords?: string
}
