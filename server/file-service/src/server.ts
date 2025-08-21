import { ENV, bootstrap } from '@chat/context';
import Routes from './controllers/Routes'

bootstrap({
    controllers: Routes,
    port: ENV.SERVER_FILE_PORT
})
