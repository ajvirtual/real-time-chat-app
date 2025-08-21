import { Field, ObjectType } from "type-graphql";
import { Column, Entity, FindManyOptions } from "typeorm";
import { TQueryResponse } from "./TBase";
import { TEntityUserCreator } from "./TEntityUserCreator";
import { Metadata, MetadataClass } from '@mzara/graphql-service-core'
import { useContextUser } from "@hooks/context";
import _ from "lodash";

@Entity()
@ObjectType()
@MetadataClass({ name: 'bookmark' })
export class TBookmark extends TEntityUserCreator {

    @Field(() => String)
    @Column({ type: 'varchar', length: '255' })
    @Metadata()
    type: string

    @Field(() => String)
    @Column({ type: 'varchar', length: '255' })
    @Metadata()
    value: string

    @Field(() => String)
    @Column({ type: 'varchar', length: '255' })
    @Metadata()
    entity: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', length: '255', nullable: true })
    @Metadata()
    entityId: string

    @Field(() => Date, { nullable: true })
    @Column({ type: 'timestamp', nullable: true})
    @Metadata()
    dateRevoked?: string

    @Field(type => Boolean)
    async isEditable(){
        return this.isOwner()
    }

    @Field(type => Boolean)
    isDeletable(){
        return this.isOwner()
    }

    static canCreate = async () => {
        const user = await useContextUser()
        return !_.isNil(user)
    }

    static dataFilter = async (options: FindManyOptions): Promise<FindManyOptions> => {
        const user = await useContextUser()
        if (user) {
            return {
                ...options,
                where: { 
                    ...options.where, 
                    userCreator: { id: user.id }
                }
            }
        }
        throw 'FORBIDDEN'
    }
}

@ObjectType()
export class TBookmarksResponse extends TQueryResponse {
    @Field(() => [TBookmark])
    data: TBookmark[];
}
