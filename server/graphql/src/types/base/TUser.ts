import { useContextOrganisationActive, useContextUser, useContextUserGroupRolesInclude } from "@hooks/context"
import { Metadata } from '@mzara/graphql-service-core'
import { MetadataClass } from '@mzara/graphql-service-core'
import { Field, ObjectType } from "type-graphql"
import { Column, Entity, FindManyOptions, ManyToOne, OneToMany } from "typeorm"
import { TMessage, TUserGroupInvitation } from ".."
import { TQueryResponse } from "./TBase"
import { TFile } from "./TFile"
import { TSessionUser } from "./TSessionUser"
import { TSoftDeleteEntity } from "./TSoftDeleteEntity"

@Entity()
@ObjectType()
@MetadataClass({ name: 'user' })
export class TUser extends TSoftDeleteEntity {

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', length: 50 })
    @Metadata()
    userName?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', length: 50 })
    @Metadata()
    userNameTolower?: string

    @Field(() => String, { nullable: true })
    @Column()
    @Metadata()
    email?: string

    @OneToMany(() => TMessage, (message) => message.sender, { nullable: true, lazy: true })
    @Field(() => [TMessage])
    @Metadata({ relation: 'TMessage', relationInverseSide: 'sender', readonly: true, multiple: true })
    sentMessages?: TMessage[]

    @OneToMany(() => TMessage, (message) => message.receiver, { nullable: true, lazy: true })
    @Field(() => [TMessage])
    @Metadata({ relation: 'TMessage', relationInverseSide: 'receiver', readonly: true, multiple: true })
    receivedMessages?: TMessage[]

    @Column({ type: 'varchar', length: '100', nullable: true })
    @Metadata()
    password?: string

    @Field(() => String)
    @Column({ type: 'varchar', length: '10', nullable: true })
    resetPasswordCode?: string

    @Field(() => String)
    @Column({ type: 'varchar', length: '100', nullable: true })
    resetPasswordToken?: string

    @Field(() => Date)
    @Column({ type: 'datetime', nullable: true })
    dateResetPasswordCreated?: string

    @Field(() => Date)
    @Column({ type: 'datetime', nullable: true })
    dateEditPassword?: string

    @Field(() => Date)
    @Column({ type: 'datetime', nullable: true })
    dateInscriptionConfirmed?: string

    @Field(() => Date)
    @Column({ type: 'datetime', nullable: true })
    dateInscriptionToken?: string

    @Field(() => Date, { nullable: true })
    @Column({ type: 'datetime', nullable: true })
    dateBirth?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', length: '255', nullable: true })
    @Metadata()
    birthPlace?: string

    @Field(() => String)
    @Column({ type: 'varchar', length: '100', nullable: true })
    inscriptionToken?: string

    @Field(() => Boolean, { nullable: true })
    @Column({ default: false })
    @Metadata({ isEditable: (data?: TUser) => data?.canBlock() })
    isDisabled?: Boolean

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', nullable: true })
    @Metadata({ isEditable: (data?: TUser) => data?.canBlock() })
    disableReason?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    firstName?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    lastName?: string
  
    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    preferredName?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    fullName?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true, default: 'UNKNOWN' })
    @Metadata()
    sexe?: 'MALE' | 'FEMALE' | 'UNKNOWN'

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    nationality?: string

    /**
     * Multiple languague using ',' separator
    */
    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    language?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', nullable: true })
    @Metadata()
    address?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', nullable: true })
    @Metadata()
    phone?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', nullable: true })
    @Metadata()
    whatsappNumber?: string

    @Field(() => Boolean, { nullable: true })
    @Column({ default: false })
    @Metadata()
    notificationEmail?: boolean

    @Field(() => Boolean, { nullable: true })
    @Column({ default: true })
    @Metadata()
    profilePublic?: boolean

    @OneToMany(() => TSessionUser, (session) => session.user, { nullable: true, lazy: true })
    @Field(() => [TSessionUser])
    @Metadata({ relation: 'TSessionUser', relationInverseSide: 'user', readonly: true, multiple: true })
    sessionUsers?: TSessionUser[]

    @Field(() => TUser, { nullable: true })
    @ManyToOne(() => TUser, { lazy: true, nullable: true })
    @Metadata({ readonly: true })
    userCreator?: TUser

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', nullable: true })
    @Metadata()
    companyName?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', nullable: true })
    @Metadata()
    companyPosition?: string

    @Field(() => TFile, { nullable: true })
    @ManyToOne(() => TFile, { lazy: true, nullable: true })
    @Metadata({ relation: 'TFile' })
    profilePicture?: TFile

    @Field(() => TFile, { nullable: true })
    @ManyToOne(() => TFile, { lazy: true, nullable: true })
    @Metadata({ relation: 'TFile' })
    coverPicture?: TFile

    @OneToMany(() => TUserGroupInvitation, (item) => item.user, { nullable: true, lazy: true })
    @Field(() => [TUserGroupInvitation])
    @Metadata({ relation: 'TUserGroupInvitation', relationInverseSide: 'user', readonly: true, multiple: true })
    invitations?: TUserGroupInvitation[]

    @Field(type => Boolean)
    async canManageUser() {

        if (this.profilePublic) {
            return useContextUserGroupRolesInclude('ORGANISATION_LICENSE')
        }

        const hasUserManagementRole = await useContextUserGroupRolesInclude('ORGANISATION_MANAGE_USER')
        const organisation = await useContextOrganisationActive()
        const invitation = await TUserGroupInvitation.find({
            where: {
                user: { id: this.id },
                status: 'ACTIVE'
            }
        })

        return invitation && hasUserManagementRole
    }

    @Field(type => Boolean)
    async canResetPassword() {
        if (await this.canManageUser()) {
            return true;
        }

        return useContextUserGroupRolesInclude('ORGANISATION_LICENSE')
    }

    @Field(type => Boolean)
    async canBlock() {
        if (await useContextUserGroupRolesInclude('ORGANISATION_LICENSE')) {
            return true;
        }

        if (await this.canManageUser()) {
            return true;
        }

        return useContextUserGroupRolesInclude('ORGANISATION_LICENSE')
    }

    @Field(type => Boolean)
    async isEditable() {

        if (this.id === (await useContextUser())?.id) {
            return true;
        }

        if (!this.profilePublic) {
            return await useContextUserGroupRolesInclude('ORGANISATION_MANAGE_USER')
        }

        if (await useContextUserGroupRolesInclude('ORGANISATION_LICENSE')) {
            return true;
        }
        return false
    }

    @Field(type => Boolean)
    async isDeletable() {
        return false
    }

    static canCreate = async () => {
        return true
    }

    static dataFilter = async (options: FindManyOptions): Promise<FindManyOptions> => {

        const organisation = await useContextOrganisationActive()

        if (organisation) {
            return {
                ...options,
                where: [
                    {
                        ...options.where,
                        invitations: {
                            group: {
                                organisation: {
                                    id: organisation?.id
                                }
                            }
                        },
                    },
                    {
                        ...options.where,
                        profilePublic: true
                    }
                ]
            }
        }

        const user = await useContextUser()
        if (user) {
            return {
                ...options,
                where: [
                    {
                        ...options.where,
                        id: user.id
                    },
                    {
                        ...options.where,
                        profilePublic: true
                    }
                ]
            }
        }
        throw 'FORBIDDEN'
    }
}


@ObjectType()
export class TUsersResponse extends TQueryResponse {
    @Field(() => [TUser])
    data: TUser[];
}
