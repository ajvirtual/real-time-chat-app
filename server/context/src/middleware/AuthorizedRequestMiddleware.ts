import { TAppContext, TDescriptor, useContextSession } from '@chat/graphql'
import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

export const autorizedRequestMiddleware = async (req: Request, res: Response, next?: NextFunction) => {

    const session = useContextSession()
    const token = req.headers['x-app-token'] || null
    const app_name = req.headers['x-app-name'] || ''

    if (req.method === 'OPTIONS') {
        return res.status(200).send()
    }
    
    if (WHITE_LIST_PATH.some((item) => req.url.includes(item))) {
        next?.()
        return;
    }

    if (!(await checkAppName(app_name as string))) {
        return res.status(403).json({ message: 'UNKNOWN_APP' })
    }

    if (!session && token) {
        return res.status(400).json({ message: 'TOKEN_INVALID' })
    }

    return res.status(502).json({ message: 'SERVICE_UNAVALAIBLE' })
    
    // if (!session_user?.is_authenticated && !(await check_trusted_graphql(req.body?.query, app_name as string))) {
    //     return res.status(403).json({ message: 'FORBIDDEN' })
    // }
}

const checkAppName = async (app_name: string) => {
    const count =  await TDescriptor.createQueryBuilder('de')
                            .where('tp=:tp', { tp: 'APP_NAME' })
                            .andWhere('ke=:app_name', { app_name })
                            .getCount()
    return count > 0
}

const check_trusted_graphql = async (query: string, app_name: string) => {

    return true
    // const txts = await Txt.createQueryBuilder('txt')
    //                     .where('tp=:tp', { tp: 'TRUSTED_REQUEST' })
    //                     .andWhere(`
    //                         (
    //                             SELECT COUNT(d.id) FROM de AS d 
    //                             INNER JOIN txt_des_de ON txt_des_de.deId=d.id
    //                             WHERE txt_des_de.txtId=txt.id AND (d.ke = "*" OR d.ke=:app_name)
    //                         ) > 0
    //                     `, { app_name })
    //                     .getMany()
    // return txts.some((item) => item.val.replace(/[\s|\n|\r]/g, '') === query.replace(/[\s|\n|\r]/g, ''))
}

const WHITE_LIST_PATH = [
    'session/token', 
    'file/download', 
    'evaluation/code/sandbox',
    'notification/internal',
    'user/import'
]
