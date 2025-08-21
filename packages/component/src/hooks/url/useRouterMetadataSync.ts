import Mustache from 'mustache';
import _ from "lodash"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useStripTag, useTranslation } from ".."
import { useDocumentMetadata } from "./useDocumentMetadata"
import { useDocumentUpdateAlternativeLang } from "./useDocumentUpdateAlternativeLang"
import { useRouterDeclaration } from "./useRouterDeclaration"
import { useRouterDeepNestedTitle } from "./useRouterDeepNestedTitle"
import { useRouterRoutes } from "./useRouterRoutes"
import { useRecoilState } from 'recoil';
import { DocumentTitleState } from '@state/DocumentTitleState';

export const useRouterMetadataSync = () => {

    const routes = useRouterRoutes()
    const getRouteDeclaration = useRouterDeclaration()
    const getNestedRouteTitle = useRouterDeepNestedTitle()
    const location = useLocation()
    const { setDocumentMetadata } = useDocumentMetadata()
    const t = useTranslation()
    const addAlternativeLang = useDocumentUpdateAlternativeLang()
    const stripTag = useStripTag()
    const [titles,] = useRecoilState(DocumentTitleState);

    useEffect(() => {
        const route = getRouteDeclaration(routes, location.pathname)
        if (route) {
            const nestedTitle = getNestedRouteTitle(routes, location.pathname)
            const concatTitle = nestedTitle.split('-').map((item) => t(item.trim())).join(' - ')
            let title = concatTitle
            if(titles) {
                title = Mustache.render(concatTitle, titles)
            }

            setDocumentMetadata({
                ...route,
                description: stripTag(t(route.description || '')),
                keywords: t(route.keywords || ''),
                title: title
            })
            addAlternativeLang()
        }
    }, [location, titles])
}
