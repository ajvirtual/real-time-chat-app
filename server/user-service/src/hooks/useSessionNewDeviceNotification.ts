import { getAPIUrl, getAppUrl } from "@chat/context"
import { TSessionUser, TUser, useContextSession } from "@chat/graphql"

export const useSessionNewDeviceNotification = async (user: TUser) => {
    const session = await useContextSession()
    const sessionUser = await TSessionUser.findOne({
        where: {
            user: { id: user?.id },
            session: { id: session?.id }
        },
        relations: ['session']
    })
    if (sessionUser) {
        return;
    }
}
