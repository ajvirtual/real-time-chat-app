import { TSession, TSessionUser } from "@chat/graphql"

export const useSessionUserGetActive = async (sessionId: number) => {
    return TSessionUser.findOne({
        where: {
            session: { id: sessionId },
            active: true
        }
    })
}
