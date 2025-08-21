import { ENV, useCreateDataSource } from "@chat/context"
import { DataSourceOptions } from "typeorm"


export const createDevConnection = async () => {
    const AppDataSource = await useCreateDataSource({
        host: ENV.DB_DEV_HOST,
        port: +ENV.DB_DEV_PORT,
        username: ENV.DB_DEV_USER,
        password: ENV.DB_DEV_PASSWORD || '',
        database: ENV.DB_DEV_NAME
    } as DataSourceOptions)
    console.log('[DataSource] Dev Created')
    return AppDataSource
}

export const createConnection = async () => {
    const AppDataSource = await useCreateDataSource({
        host: ENV.DB_HOST,
        port: +ENV.DB_PORT,
        username: ENV.DB_USER,
        password: ENV.DB_PASSWORD || '',
        database: ENV.DB_NAME
    } as DataSourceOptions)
    console.log('[DataSource] Created')
    return AppDataSource
}
