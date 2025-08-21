import { useGraphqlQuery } from "@hooks/query/useGraphqlQuery"
import { Translation, TranslationQuery } from "./TranslationQuery"
import { useTranslationLang } from "./useTranslationLang"

export const useTranslationLoad = (suspense?: boolean, enabled?: boolean) => {
    const { lang } = useTranslationLang()
    return useGraphqlQuery<TranslationQuery, Translation>(new TranslationQuery(lang.toUpperCase()), { suspense, enabled, refetchOnMount: false })
}
