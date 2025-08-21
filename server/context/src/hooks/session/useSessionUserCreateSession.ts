import { TSession, TSessionUser, TUser } from "@chat/graphql"

export const useSessionUserCreateSession = () => {
    return ({ session, user, ...rest }: Params) => {
        const session_user = TSessionUser.create({
            session,
            user,
            ...rest
        })
        return session_user.save()
    }
}

type Params = {
    session: TSession,
    user?: TUser,
    remember?: boolean
    authenticated?: boolean
    active?: boolean
}
