import { ENV } from "config/env"

export const getAPIUrl = (path: string) => {

    return `${ENV.SERVER_APP_API_ENDPT}${path.replace(/^\//, '')}`
}
