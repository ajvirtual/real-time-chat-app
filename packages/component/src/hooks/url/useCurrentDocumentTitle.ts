import Mustache from 'mustache';
import { useTranslation } from ".."
import { useRouterDeepNestedTitle } from './useRouterDeepNestedTitle';
import { useRouterRoutes } from './useRouterRoutes';
import { useMemo } from "react";
import { useRouterDeclaration } from "./useRouterDeclaration";
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { DocumentTitleState } from "@state/DocumentTitleState"

export const useCurrentDocumentTitle = () => {

    const routes = useRouterRoutes()
    const location = useLocation()

    const getRouteDeclaration = useRouterDeclaration()
    const getNestedRouteTitle = useRouterDeepNestedTitle()
    const t = useTranslation()
    const [titles,] = useRecoilState(DocumentTitleState);
    const route = getRouteDeclaration(routes as any, location.pathname)
    const nestedTitle = getNestedRouteTitle(routes as any, location.pathname)

    return useMemo((): string => {
        const rawTitle = nestedTitle.split('-').map((item) => t(item.trim())).join(' - ')

        if (route) {
            if(titles) {
                return Mustache.render(rawTitle, titles)
            }
            return rawTitle
        }

        return ''
        
    }, [route, titles, location.pathname])

}
