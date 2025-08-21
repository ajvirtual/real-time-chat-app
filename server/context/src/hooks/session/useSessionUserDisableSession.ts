import { TSessionUser } from "@chat/graphql"

export const useSessionUserDisableSession = (sessionId: number) => {
    return TSessionUser.update({ session: { id: sessionId } }, { active: false })
}
