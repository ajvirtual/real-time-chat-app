import { ENV } from "config/env"

export const getCDNUrl = (path: string) => {

    return `${ENV.SERVER_APP_CDN_ENDPT}${path.replace(/^\//, '')}`
}
