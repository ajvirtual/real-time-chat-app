import { DataSource, DataSourceOptions } from 'typeorm';
import { Entities } from '@chat/graphql';
import { MigrationV1 } from '../migration/v1';
import { useSetGlobalAppDataSource } from './useSetGlobalAppDataSource';

export const useCreateDataSource = async (options: Partial<DataSourceOptions>, runMigration?: boolean) => {

    const AppDataSource = new DataSource({
        ...(defaultOptions),
        ...options,
    } as DataSourceOptions)
    try {
        await AppDataSource.initialize()
        console.log('[DataSource] Created')
        if (runMigration) {
            await AppDataSource.synchronize()
            console.log('[DataSource] Synchronized')
            await AppDataSource.runMigrations()
            console.log('[Migration] Successed')
        }
        useSetGlobalAppDataSource(AppDataSource)
        return AppDataSource
    } catch (e) {
        console.error("Error during Data Source initialization", JSON.stringify(e))
    }
}

const defaultOptions: DataSourceOptions = {
    name: 'default',
    type: 'mysql',
    charset: 'utf8mb4',
    entities: [
        ...Entities
    ],
    migrations: [
        ...MigrationV1
    ],
}
