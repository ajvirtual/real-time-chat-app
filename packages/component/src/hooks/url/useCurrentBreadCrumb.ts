import Mustache from 'mustache';
import { BreadCrumbItemProps } from './../../components/breadcrumb/BreadCrumb';
import { useRouterDeepNested } from './useRouterDeepNested';
import { useRouterRoutes } from './useRouterRoutes';
import { useRouterDeclaration } from "./useRouterDeclaration";
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { DocumentTitleState } from "@state/DocumentTitleState"
import { useTranslation } from '@hooks/translation/useTranslation';


export const useCurrentBreadCrumb = () => {

    const routes = useRouterRoutes();
    const getRouteDeclaration = useRouterDeclaration();
    const getNestedRoute = useRouterDeepNested()
    const location = useLocation();
    const [titles,] = useRecoilState(DocumentTitleState);
    const t = useTranslation()
    
    return useMemo(() => {
        const route = getRouteDeclaration(routes as any, location.pathname);
        if (route) {
            const nestedRoute = getNestedRoute(routes as any, location.pathname)
            let breadcrumb: Array<BreadCrumbItemProps> = [];
            nestedRoute?.filter((item) => item.title)
                .forEach((item: any) => {
                    const link = item?.path;
                    let title = t(item?.title);
                    if(titles) {
                        title = Mustache.render(title, titles)
                    }
                    breadcrumb.push({
                        label: title,
                        link: link,
                    })
                });
            breadcrumb = breadcrumb.reverse()
            breadcrumb[breadcrumb.length - 1] = {
                ...breadcrumb[breadcrumb.length - 1],
                className: 'active'
            }
            
            return breadcrumb;
        }
        return []
    }, [location, titles, t]);
};