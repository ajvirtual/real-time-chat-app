import { DataSource } from "typeorm";

export const useSetGlobalAppDataSource = (datasource: DataSource) => {
    (global as any).appDataSource = datasource
}