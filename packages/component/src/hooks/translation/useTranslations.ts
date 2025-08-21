import { useTranslation } from "./useTranslation"

export const useTranslations = (keys: Array<string>): Array<string> => {
    const t = useTranslation()
    return keys.map((key) => t(key))
}
