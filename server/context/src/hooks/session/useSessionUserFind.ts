import { TSession, TSessionUser, TUser } from "@chat/graphql"

export const useSessionUserFind = (sessionId: number, userId?: number) => {
    return TSessionUser.findOne({ where: { session: { id: sessionId }, user: { id: userId } } })
}
