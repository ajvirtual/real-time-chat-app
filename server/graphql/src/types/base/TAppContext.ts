import 'reflect-metadata'
import { TSessionUser } from './TSessionUser';

export type TAppContext = {
    sessionUser: TSessionUser;
    userAgent?: TUserAgent;
    appName?: string
    lang?: string
}

export type TUserAgent = {
    isMobile?: boolean,
    isDesktop?: boolean,
    isBot?: boolean,
    browser?: string,
    version?: string,
    os?: string,
    platform?: string,
    source?: string
}

