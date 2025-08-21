import { TSession } from "@chat/graphql"
import { useSessionUserDisableSession } from "./useSessionUserDisableSession"
import { useSessionUserEnableAnonymousSession } from "./useSessionUserEnableAnonymousSession"

export const useSessionLogoutUserDevice = async (sessionId: number) => {
    await useSessionUserDisableSession(sessionId)
    await useSessionUserEnableAnonymousSession(sessionId)
}
