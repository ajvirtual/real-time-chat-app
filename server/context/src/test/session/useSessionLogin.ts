import { TSession, TUser } from "@chat/graphql";
import { useSessionCreateToken } from "hooks/session/useSessionCreateToken";
import { useSessionLoginUserDevice } from "hooks/session/useSessionLoginUserDevice";
import { getUserAgent } from "test/InitGlobalApp";

export const useSessionLogin = async (userName: string): Promise<string> => {

    const user = await TUser.findOne({ where: { userName } })
    const token = await useSessionCreateToken(getUserAgent())
    const session = await TSession.findOne({ where: { token } })
    await useSessionLoginUserDevice(session, user)
    return token
}
