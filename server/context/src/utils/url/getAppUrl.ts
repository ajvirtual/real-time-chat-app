import { ENV } from "config/env"

export const getAppUrl = (path: string, lang?: string) => {
    return `${ENV.SERVER_APP_URL}${lang ? `${lang}/` : ''}${path.replace(/^\//, '')}`
}
