import { ENV, bootstrap } from '@chat/context';
import { useAppolo } from 'appolo';
import "reflect-metadata"

const init = async () => {

    await bootstrap({
        port: ENV.SERVER_GRAPHQL_PORT,
        runMigration: true,
        onBeforeLaunch: async (app) => {
            const apollo_server = await useAppolo()
            apollo_server.applyMiddleware({ app })
        }
    })
}

init()
