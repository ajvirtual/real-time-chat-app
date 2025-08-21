import bcrypt from 'bcrypt';
import { useUserFind } from "./useUserFind"
import { TUser } from "@chat/graphql"

export const useUserAuth = async (userName: string, password: string): Promise<ResultAuth> => {
    const user = await useUserFind(userName)
    if (!user) {
        return {
            result: AuthCode.NOT_FOUND
        }
    }
    if (user.isDisabled) {
        return {
            result: AuthCode.BLOCKED
        }
    }
    if (!user.dateInscriptionConfirmed) {
        return {
            result: AuthCode.INSCRIPTION_NOT_CONFIRMED
        }
    }
    if (await bcrypt.compare(password, user.password)) {
        return {
            result: AuthCode.OK,
            user: user
        }
    }

    return {
        result: AuthCode.FAIL,
        user: undefined
    }
}

type ResultAuth = {
    result: AuthCode
    user?: TUser
}



export enum AuthCode {
    USER_NAME_EMPTY = 'USER_NAME_EMPTY',
    PASSWORD_EMPTY = 'PASSWORD_EMPTY',
    NOT_FOUND = 'NOT_FOUND',
    BLOCKED = 'BLOCKED',
    INSCRIPTION_NOT_CONFIRMED = 'INSCRIPTION_NOT_CONFIRMED',
    OK = 'OK',
    FAIL = 'FAIL',
    UNAUTHORIZED_APP = 'UNAUTHORIZED_APP',
    ORGANISATION_DISABLED = 'ORGANISATION_DISABLED'
}