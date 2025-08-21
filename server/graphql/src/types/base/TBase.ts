import { Field, ObjectType } from "type-graphql"
import { TAppContext } from './TAppContext'
import 'reflect-metadata'
import { Metadata } from '@mzara/graphql-service-core'
import { MetadataClass } from '@mzara/graphql-service-core'
import { Entity, FindManyOptions, PrimaryGeneratedColumn, BaseEntity as TypeOrmBaseEntity } from "typeorm"
import _ from "lodash"

@ObjectType()
@MetadataClass()
export class TBase extends TypeOrmBaseEntity {

    @PrimaryGeneratedColumn('increment', { 
        type: 'int',
        unsigned: true
    })
    @Field(type => Number)
    @Metadata({ searchable: false })
    id: number

    @Field(type => Boolean)
    isEditable(): Promise<boolean> | boolean {
        return false
    }

    @Field(type => Boolean)
    isDeletable(): Promise<boolean> | boolean {
        return false
    }

    @Field(type => Boolean)
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

    /**
     * Mainly used for unit testing
     * @returns Object representing the instance
     */
    toObject = () => {
        return Object.keys(this).reduce((all, key) => {
            if (!['context', 'toObject'].includes(key) && !_.isNil(this[key])) {
                if (Array.isArray(this[key])) {
                    all[key] = this[key].filter((item) => item.toObject).map((item) => item.toObject())
                } else if (typeof this[key] === 'object' && this[key].toObject) {
                    all[key] = this[key].toObject()
                } else if (typeof this[key] !== 'function') {
                    all[key] = this[key]
                }
            }
            return all
        }, {})
    }
}

@ObjectType()
export class TQueryResponse {
    @Field(() => Number)
    total : number;
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
