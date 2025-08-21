
import { TSession, TSessionUser, TUser } from "@chat/graphql"
import { useSessionUserCreateSession } from "./useSessionUserCreateSession"
import { useSessionUserDisableSession } from "./useSessionUserDisableSession"
import { useSessionUserEnable } from "./useSessionUserEnable"
import { useSessionUserFind } from "./useSessionUserFind"
import { sendEmail } from "email"
import { useBackendTranslations } from "hooks/translation"
import { getAPIUrl, getAppUrl } from "utils"

const createSession = useSessionUserCreateSession()
export const useSessionLoginUserDevice = async (session?: TSession, user?: TUser, remember?: boolean) => {
    if(session) {
        await useSessionUserDisableSession(session?.id)
    }

    const sessionUser = await useSessionUserFind(session?.id, user?.id)
    if (sessionUser) {
        await useSessionUserEnable(sessionUser, remember)
        return sessionUser;
    }

    const newSessionUser = await createSession({ session, user, active: true, authenticated: true, remember })

    return newSessionUser
}