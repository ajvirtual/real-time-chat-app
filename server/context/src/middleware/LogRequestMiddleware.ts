import { useContextSession, TLog } from '@chat/graphql'
import { ENV } from 'config/env'
import { Request, Response, NextFunction } from 'express'
import { useSessionUserGetActive } from 'hooks'

export const logRequestMiddleware = async (req: Request, res: Response, next?: NextFunction) => {

    if (ENV.NODE_ENV === 'test') {
        next?.()
        return;
    }

    res.on('finish', async () => {
        try {
            const session = await useContextSession()
            const sessionUser = await useSessionUserGetActive(session?.id)
            const tp = /^\/graphql$/.test(req.url) ? 'GRAPHQL' : 'REST'
            const log = new TLog()
            log.sessionUser = sessionUser
            log.tp = tp
            log.req = req.body?.query
            log.req_method = req.method
            log.app_name = req.headers['x-app-name'] as string
            log.req_data = JSON.stringify(
                tp === 'GRAPHQL' 
                ? (
                    { ...(req.body?.variables || {}), password: undefined }
                )
                : req.body
            )
            log.res_code = res.statusCode

            await log.save()
        } catch (e) {
            console.error(e)
        }
    })
    next?.()
}
