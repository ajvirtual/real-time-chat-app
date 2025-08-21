import { TSession, TUserAgent } from '@chat/graphql';
import {v4 as uuid} from 'uuid';

export const useSessionCreateToken = async (userAgent: TUserAgent) => {
    const session = TSession.create({
        token: uuid() as string,
        browser: userAgent.browser,
        browserVersion: userAgent.version,
        device: userAgent.platform,
        plateform: userAgent.os,
        userAgent: userAgent.source,
        userAgentJson: JSON.stringify(userAgent)
    })
    await session.save()
    return session.token
}
