import { ENV } from '@chat/context';
import { Express } from 'express';
import { Routes as FileRoutes } from '@chat/file-service'
import { Routes as UserRoutes } from '@chat/user-service'
import { Routes as ChatRoutes } from '@chat/chat-service'
import { useAppolo } from '@chat/graphql-service'

export const getControllerImport = async (app: Express) => {
    app.use(FileRoutes)
    app.use(UserRoutes)
    app.use(ChatRoutes)

    const apollo_server = await useAppolo()
    apollo_server.applyMiddleware({ app })
}
