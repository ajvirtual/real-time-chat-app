import { useEffect } from "react";
import moment from 'moment';
import "moment/locale/fr";
import "moment/locale/en-gb";
import { useTranslationLang } from "@hooks/translation/useTranslationLang";

export const useMomentLang = () => {
    const { lang } = useTranslationLang();

    useEffect(() => {
        const currentLocal = moment.locale()
        if (![lang, 'eng-gb'].includes(currentLocal)) {
            moment.locale(lang === "en" ? "en-gb" : lang)
        }
    }, [lang]);
}
