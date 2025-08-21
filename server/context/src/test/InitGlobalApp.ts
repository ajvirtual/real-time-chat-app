import { TUserAgent } from "@chat/graphql"
import { AppProps, getExpressApp } from "Bootstrap"
import { ENV } from "config/env"
import { useCreateDataSource } from "db"
import request from 'supertest'


export const bootstrapTest = async (props: AppProps) => {
    const app = getExpressApp(props)
    const dataSource = await useCreateDataSource({
        host: ENV.DB_HOST,
        port: +ENV.DB_PORT,
        username: ENV.DB_USER,
        password: ENV.DB_PASSWORD || '',
        database: ENV.DB_NAME,
    }, props.runMigration)
    return {
        app: app.set('x-app-name', 'unit-test'),
        dataSource
    }
}

export const initGlobalApp = async(props: AppProps) => {
    const { app, dataSource } = await bootstrapTest(props);
    (global as any).app = app;
    (global as any).dataSource = dataSource;

}

export const getGlobalApp = () => {
    return (global as any).app
}

export const getGlobalDataSource = () => {
    return (global as any).dataSource
}

export const closeDataSource = () => {
    return (global as any).dataSource?.destroy()
}

export const getRequest = () => {
    const app = getGlobalApp()
    return request(app)
}

export const getUserAgent = (): TUserAgent => {
    return {
        browser: 'Unit test',
        isBot: false,
        isDesktop: false,
        isMobile: false,
        os: process.platform,
        platform: process.platform,
        source: 'local',
        version: '1.0.0'
    }
}
