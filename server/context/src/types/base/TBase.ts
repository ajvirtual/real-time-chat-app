import 'reflect-metadata'
import { Entity, FindManyOptions, PrimaryGeneratedColumn, BaseEntity as TypeOrmBaseEntity } from "typeorm"
import _ from "lodash"

@Entity()
export class TBase extends TypeOrmBaseEntity {

    @PrimaryGeneratedColumn('increment', { 
        type: 'int',
        unsigned: true
    })
    id: number

    isEditable(): Promise<boolean> | boolean {
        return false
    }

    isDeletable(): Promise<boolean> | boolean {
        return false
    }

    canRead(): Promise<boolean> | boolean {
        return true
    }

    /**
     * If true, it will skip saving each property
     */
    skipSaving?: boolean

    static canCreate?: (payload?: any) => boolean | string | Promise<string | boolean> = () => {
        return true
    }

    static dataFilter?: TEntityFilterFn = async (options) => {
        return options
    }

}

export type TEntityRulesFn<TData = any> = () => boolean | Promise<boolean>

export type TEntityFn = () => any

export type AliasFn = () => Array<TAlias> 

export type TEntityFilterFn = (options?: FindManyOptions) => Promise<FindManyOptions>

export type TAlias = {
    field: string
    alias: string
    relation?: 'MONO' | 'MULTI'
}
