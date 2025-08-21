import { ENV, useCreateDataSource } from "@chat/context"

export const getDataSource = async () => {

    return useCreateDataSource({
        host: ENV.DB_HOST,
        port: +ENV.DB_PORT,
        username: ENV.DB_USER,
        password: ENV.DB_PASSWORD || '',
        database: ENV.DB_NAME,
    }, ENV.NODE_ENV !== 'production')
}
