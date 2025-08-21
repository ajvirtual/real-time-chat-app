import { useContextUser } from '@hooks/context';
import { Metadata } from '@mzara/graphql-service-core'
import { MetadataClass } from '@mzara/graphql-service-core'
import { Field, ObjectType } from 'type-graphql';
import { ManyToOne } from 'typeorm';
import { TSoftDeleteEntity } from './TSoftDeleteEntity';
import { TUser } from './TUser';

@ObjectType()
@MetadataClass()
export class TEntityUserCreator extends TSoftDeleteEntity {

    @Field(() => TUser, { nullable: true })
    @ManyToOne(() => TUser, { lazy: true, nullable: true })
    @Metadata({ readonly: true, relation: 'TUser' })
    userCreator?: TUser

    @Field(type => Boolean)
    async isOwner(){
        return (await this.userCreator)?.id === (await useContextUser())?.id
    }

    @Field(type => Boolean)
    async isSameOrganisation(){
        return false
    }
}
