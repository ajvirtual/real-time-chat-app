import { MetadataClass } from '@mzara/graphql-service-core'
import { Field, ObjectType } from "type-graphql"
import { Column, Entity } from "typeorm"
import { TSoftDeleteEntity } from "./TSoftDeleteEntity"
import { useContextUser } from "@hooks/context"
import { Metadata } from '@mzara/graphql-service-core'
import { TQueryResponse } from './TBase'

@Entity()
@ObjectType()
@MetadataClass({ name: 'file' })
export class TFile extends TSoftDeleteEntity {

    @Field(() => String)
    @Column({ type: 'varchar', length: '255' })
    @Metadata({ readonly: true })
    name: string

    @Field(() => String)
    @Column({ type: 'varchar', length: '72', nullable: true })
    @Metadata({ readonly: true })
    hash: string
    
    @Field(() => String, { nullable: true })
    @Column({ type: 'text', nullable: true })
    @Metadata({ readonly: true })
    value?: string

    @Field(type => Boolean)
    canRead(){
        return true
    }

    @Field(type => Boolean)
    isEditable(){
        return false
    }

    @Field(type => Boolean)
    isDeletable(){
        return false
    }

    static canCreate = async () => {
        const user = await useContextUser()
        return user !== undefined
    }
}


@ObjectType()
export class TFilesResponse extends TQueryResponse {
    @Field(() => [TFile])
    data: TFile[];
}
