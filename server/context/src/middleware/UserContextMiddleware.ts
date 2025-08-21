import { TAppContext, TSession, TSessionUser, TUserAgent, useSetContext } from '@chat/graphql'
import { Request, Response, NextFunction } from 'express'
import expressUserAgent from 'express-useragent'
import { useSessionUserCreateSession, useSessionUserGetActive } from 'hooks/session'

const createSession = useSessionUserCreateSession()

export const userContextMiddleware = async (req: Request, res: Response, next?: NextFunction) => {
    // Check tocken
    const context = await checkSession(req)
    req.app.set('context', context)
    useSetContext(context)

    next?.()
    return context
}

export const checkSession = async (req: Request): Promise<TAppContext> => {
    const token: string | null = req.headers['x-app-token'] as string || null
    const lang: string = req.headers['x-app-lang'] as string || 'FR'
    const appName = req.headers['x-app-name'] as string || ''
    let userAgent: string | TUserAgent = req.headers['user-agent']
    userAgent = expressUserAgent.parse(userAgent || '') as TUserAgent
    const session = await TSession.findOne({ where: { token: token || '' } })
    let sessionUser: TSessionUser = null
    if (session) {
        sessionUser = await useSessionUserGetActive(session.id)
        if(!sessionUser) {
            // create anonumous session
            sessionUser = await createSession({
                session,
                user: null,
                active: true,
                authenticated: false,
                remember: false
            })
        }
    }

    return { sessionUser, userAgent, appName, lang }
}
