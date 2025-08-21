import { TSessionUser } from "@chat/graphql"

export const useSessionUserEnable = async (sessionUser: TSessionUser, remember: TSessionUser['remember'] = true) => {
    sessionUser.active = true
    sessionUser.remember = remember
    await sessionUser.save()
    return 
}