import { useTranslationLang } from '../translation/'

export const useNumberFormat = (options?: Intl.NumberFormatOptions) => {
    const { lang } = useTranslationLang()
    const locale = LOCALES[lang ?? 'default']

    return (num: number, _options?: Intl.NumberFormatOptions) => {
        const formatter = new Intl.NumberFormat(locale, {
            ...options,
            ..._options,
            maximumFractionDigits: _options?.maximumFractionDigits ?? options?.maximumFractionDigits ?? 2,
            minimumFractionDigits: _options?.minimumFractionDigits ?? options?.minimumFractionDigits ?? 0,
        }).format(num);
        return formatter !== 'NaN' ? formatter : '-'
    }
}

const LOCALES = {
    default: 'fr-FR',
    fr: 'fr-FR',
    en: 'en-US'
}
