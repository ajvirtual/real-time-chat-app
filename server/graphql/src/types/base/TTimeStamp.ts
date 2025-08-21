import { Metadata } from '@mzara/graphql-service-core'
import { MetadataClass } from '@mzara/graphql-service-core'
import { Field, ObjectType } from 'type-graphql';
import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { TBase } from './TBase';

@ObjectType()
@MetadataClass()
export class TTimeStamp extends TBase {

    @Field(() => String)
    @CreateDateColumn()
    @Metadata({ searchable: false, readonly: true })
    createdAt: string

    @Field(() => String)
    @UpdateDateColumn({ nullable: true })
    @Metadata({ searchable: false, readonly: true })
    updatedAt?: string
}