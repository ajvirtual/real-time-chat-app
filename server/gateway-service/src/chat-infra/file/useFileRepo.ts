import { ENV } from '@chat/context'
import os from 'os'

if (ENV.NODE_ENV === 'test') {
    (global as any).FILE_REPO = `${__dirname}/../../../file-repo`
}

export const getFileRepo = () => {
    if (!(global as any).FILE_REPO) {
        (global as any).FILE_REPO = ENV.SERVER_FILE_REPO ?? `/file-repo`
    }
    return (global as any).FILE_REPO?.replace('~', os.homedir())
}

export const getFilePath = (fileName: string) => `${getFileRepo()}/${fileName}`
