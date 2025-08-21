import { Metadata } from '@mzara/graphql-service-core'
import { MetadataClass } from '@mzara/graphql-service-core'
import { Field, ObjectType } from "type-graphql"
import { Column, Entity, FindManyOptions, ManyToOne, OneToMany } from "typeorm"
import { TUser } from "./TUser"
import { useContextOrganisationActive, useContextUserGroupRolesInclude } from "@hooks/context"
import { TUserGroup } from './TUserGroup'
import { TQueryResponse } from './TBase'
import { TSoftDeleteEntity } from './TSoftDeleteEntity'
import { TEntityUserCreator } from './TEntityUserCreator'

@Entity()
@ObjectType()
@MetadataClass({ name: 'userGroupInvitation' })
export class TUserGroupInvitation extends TEntityUserCreator {

    @Field(() => TUserGroup, { nullable: true })
    @ManyToOne(() => TUserGroup, { lazy: true })
    @Metadata({ relation: 'TUserGroup', readonly: true })
    group?: TUserGroup

    @Field(() => TUser, { nullable: true })
    @ManyToOne(() => TUser, { lazy: true })
    @Metadata({ relation: 'TUser', readonly: true })
    user?: TUser

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata({ readonly: true })
    token?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata({ readonly: true })
    email?: string

    /**
     * PENDING: Invitation en cours
     * ACTIVE: Active
     * EXCLUDED: Exclue de l'organisation
     */
    @Field(() => String)
    @Column()
    @Metadata({ readonly: true })
    status: 'PENDING' | 'ACTIVE' | 'EXCLUDED'

    @Field(() => Date, { nullable: true })
    @Column({ type: 'datetime', nullable: true})
    @Metadata()
    dateExpired?: string

    @Field(type => Boolean)
    async isEditable() {
        return (await useContextUserGroupRolesInclude('ORGANISATION_MANAGE_USER'))
    }

    @Field(type => Boolean)
    isDeletable(){
        return this.isEditable()
    }

    static async canCreate() {
        return useContextUserGroupRolesInclude('ORGANISATION_MANAGE_USER')
    }

    
    static dataFilter = async (options: FindManyOptions): Promise<FindManyOptions> => {


        const organisation = await useContextOrganisationActive()
        if (organisation) {

            if ((await useContextUserGroupRolesInclude('ORGANISATION_MANAGE_USER'))) {
                return options
            }

            return {
                ...options,
                where: { 
                    ...options.where, 
                    organisation: {
                        id: organisation?.id
                    }
                }
            }
        }
        throw 'FORBIDDEN'
    }
}


@ObjectType()
export class TUserGroupInvitationsResponse extends TQueryResponse {
    @Field(() => [TUserGroupInvitation])
    data: TUserGroupInvitation[];
}
