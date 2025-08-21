import { useContextUserGroupRolesInclude, useContextUserOrganisations } from "@hooks/context"
import { TDescriptor } from "@_types/base/TDescriptor"
import { Metadata } from '@mzara/graphql-service-core'
import { MetadataClass } from '@mzara/graphql-service-core'
import { Field, ObjectType } from "type-graphql"
import { Column, Entity, FindManyOptions, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm"
import { TSoftDeleteEntity } from "./TSoftDeleteEntity"
import { TUser } from "./TUser"
import { TUserOrganisation } from "./TUserOrganisation"
import { useContextOrganisationActive } from "@hooks/context/useContextOrganisationActive"
import { TQueryResponse } from "./TBase"
import { TUserGroupInvitation } from "./TUserGroupInvitation"

@Entity()
@ObjectType()
@MetadataClass({ name: 'userGroup' })
export class TUserGroup extends TSoftDeleteEntity {

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    groupKey?: string

    @Field(() => String)
    @Column()
    @Metadata()
    designation?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    comment?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    color?: string

    @Field(() => [TDescriptor], { nullable: true })
    @ManyToMany(() => TDescriptor, { lazy: true })
    @JoinTable()
    @Metadata({ relation: 'TDescriptor' })
    roles?: Array<TDescriptor>

    @Field(() => TUserOrganisation, { nullable: true })
    @ManyToOne(() => TUserOrganisation, (userOrganisation) => userOrganisation.groups, { lazy: true, nullable: true })
    @Metadata({ relation: 'TUserOrganisation' })
    organisation?: TUserOrganisation

    @Field(() => TUser, { nullable: true })
    @ManyToOne(() => TUser, { lazy: true, nullable: true })
    @Metadata({ readonly: true, relation: 'TUser' })
    userCreator?: TUser

    @OneToMany(() => TUserGroupInvitation, (item) => item.group, { nullable: true, lazy: true })
    @Field(() => [TUserGroupInvitation])
    @Metadata({ relation: 'TUserGroupInvitation', relationInverseSide: 'group', multiple: true , readonly: true })
    invitations?: TUserGroupInvitation[]

    @Field(type => Number)
    async userCount(){
        const invitations = await this.invitations
        return invitations.length
    }

    @Field(type => Boolean)
    async isEditable() {
        return Boolean(await TUserGroup.canCreate(this))
    }
    
    @Field(type => Boolean)
    async isDeletable(){
        const invitations = await this.invitations
        return this.isEditable() && invitations.length === 0
    }

    static canCreate = async (payload: TUserGroup) => {
        const organisations = await useContextUserOrganisations()
        const payloadOrganisation = await payload.organisation
        if (!payloadOrganisation) {
            return 'ORGANISATION_REQUIRED'
        }

        if (!organisations.some((item) => item.id === payloadOrganisation.id)) {
            return 'USER_NOT_ASSOCIATED_TO_ORGANISATION'
        }

        return useContextUserGroupRolesInclude('ORGANISATION_GROUP')
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
export class TUserGroupsResponse extends TQueryResponse {
    @Field(() => [TUserGroup])
    data: TUserGroup[];
}
