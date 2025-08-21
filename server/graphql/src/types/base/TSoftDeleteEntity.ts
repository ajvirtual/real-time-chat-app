import { Metadata } from '@mzara/graphql-service-core'
import { MetadataClass } from '@mzara/graphql-service-core'
import { Field, ObjectType } from 'type-graphql';
import { DeleteDateColumn, Entity } from 'typeorm';
import { AliasFn, TBase } from './TBase';
import { TTimeStamp } from './TTimeStamp';

@ObjectType()
@MetadataClass()
export class TSoftDeleteEntity extends TTimeStamp {

    @Field(() => Date)
    @DeleteDateColumn({ nullable: true })
    deletedAt?: string
}