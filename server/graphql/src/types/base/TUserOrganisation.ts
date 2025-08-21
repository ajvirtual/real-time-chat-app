import { useContextOrganisationActive, useContextUser, useContextUserGroupRolesInclude, useContextUserOrganisations } from "@hooks/context"
import {  TDescriptor, TFile, TTransaction, TQueryResponse, TUser } from "@_types/base"
import { Metadata } from '@mzara/graphql-service-core'
import { MetadataClass } from '@mzara/graphql-service-core'
import { Field, ObjectType } from "type-graphql"
import { Column, Entity,  FindManyOptions,  JoinTable,  ManyToMany,  ManyToOne, OneToMany } from "typeorm"
import { TSoftDeleteEntity } from "./TSoftDeleteEntity"
import { TUserGroup } from "./TUserGroup"

@Entity()
@ObjectType()
@MetadataClass({ name: 'userOrganisation' })
export class TUserOrganisation extends TSoftDeleteEntity {

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    organisationKey?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    designation?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'text', nullable: true })
    @Metadata()
    description?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    email?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    adress?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    nif?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    stat?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    rcs?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    cnaps?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    representative?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    representativePoste?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata()
    phone?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'text', nullable: true })
    @Metadata()
    comment?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', length: '255', nullable: true })
    @Metadata()
    facebook?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', length: '255', nullable: true })
    @Metadata()
    linkedIn?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', length: '255', nullable: true })
    @Metadata()
    skype?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', length: '255', nullable: true })
    @Metadata()
    whatsapp?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', length: '255', nullable: true })
    @Metadata()
    website?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', length: '10', nullable: true })
    @Metadata()
    contractSalaryPrefix?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', length: '10', nullable: true })
    @Metadata()
    contractMatriculePrefix?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', length: '10', nullable: true, default: 'OSTIE' })
    @Metadata()
    smieType?: 'OSTIE' | 'FUNHECE' 

    @Field(() => [TUserGroup], { nullable: true })
    @OneToMany(() => TUserGroup, (user) => user.organisation, { lazy: true, nullable: true })
    @Metadata({ relation: 'TUserGroup', relationInverseSide: 'organisation', multiple: true })
    groups?: Array<TUserGroup>

    @Field(() => [TDescriptor], { nullable: true })
    @ManyToMany(() => TDescriptor, { lazy: true })
    @JoinTable()
    @Metadata({ 
        relation: 'TDescriptor',
        isEditable: async (data?: TUserOrganisation) => data.canEditRole()
    })
    /**
     * @deprecated the logic of roles are moved inside licenseTransaction, this field will be removed soon
     */
    roles?: Array<TDescriptor>

    @Field(() => TTransaction, { nullable: true })
    @ManyToOne(() => TTransaction, { lazy: true, nullable: true,  })
    @Metadata({ relation: 'TTransaction' })
    licenseTransaction?: TTransaction

    @Field(() => TUser, { nullable: true })
    @ManyToOne(() => TUser, { lazy: true, nullable: true })
    @Metadata({ readonly: true, relation: 'TUser' })
    userCreator?: TUser

    @Field(() => TFile, { nullable: true })
    @ManyToOne(() => TFile, { lazy: true, nullable: true })
    @Metadata({ relation: 'TFile' })
    logo?: TFile

    @Field(() => TFile, { nullable: true })
    @ManyToOne(() => TFile, { lazy: true, nullable: true })
    @Metadata({ relation: 'TFile' })
    cover?: TFile

    @Field(() => Boolean, { defaultValue: false })
    @Column({ type: 'tinyint', default: false })
    @Metadata({ readonly: true })
    isDisabled: boolean

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata({ readonly: true })
    disableReason?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true, default: "08:00" })
    @Metadata({ isEditable: (data) => data.canUpdateWorkTime(), })
    workHourBegin?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true, default: "12:00" })
    @Metadata({ isEditable: (data) => data.canUpdateWorkTime(), })
    workRestHourBegin?: string
    
    @Field(() => String, { nullable: true })
    @Column({ nullable: true, default: "13:00" })
    @Metadata({ isEditable: (data) => data.canUpdateWorkTime(), })
    workRestHourEnd?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true, default: "17:00" })
    @Metadata({ isEditable: (data) => data.canUpdateWorkTime(), })
    workHourEnd?: string

    
    /**
     * tp: CURRENCY
     */
    @Field(() => [TDescriptor], { nullable: true })
    @ManyToMany(() => TDescriptor, { lazy: true })
    @JoinTable()
    @Metadata({
        relation: 'TDescriptor',
    })
    currencies?: TDescriptor[]

    /**
     * JSON value structured like { "CURRENCY": value, ... }
     */
    @Field(() => String, { nullable: true })
    @Column({ type: 'text', nullable: true})
    @Metadata({ searchable: false })
    exchangeRates?: string

    @Field(type => Boolean)
    /**
     * @deprecated Since licenses are introduced, it is not pertinent tout use this anymore
     */
    async canEditRole(){
        return false
    }

    @Field(type => Boolean)
    async canEditGroup(){
        if (await this.isOwner()) {
            return true
        }

        const hasRole = await useContextUserGroupRolesInclude('ORGANISATION_GROUP')
        return hasRole && !this.isDisabled
    }

    @Field(type => Boolean)
    async canEditUsers(){

        if (await this.isOwner()) {
            return true
        }

        const hasRole = await useContextUserGroupRolesInclude('ORGANISATION')
        return hasRole && !this.isDisabled
    }

    @Field(type => Boolean)
    async canUpdateWorkTime(){
        return useContextUserGroupRolesInclude('APPOINTMENT_ABSCENCE')
    }

    @Field(type => Boolean)
    async canAddUser(){
        const hasRole = await useContextUserGroupRolesInclude('ORGANISATION_MANAGE_USER')
        return hasRole && !this.isDisabled
    }

    @Field(type => Boolean)
    async canDisable(){
        const hasRole = await useContextUserGroupRolesInclude('ORGANISATION_LICENSE')
        return hasRole && !this.isDisabled
    }

    @Field(type => Boolean)
    async canRestore(){
        const hasRole = await useContextUserGroupRolesInclude('ORGANISATION_LICENSE')
        return hasRole && this.isDisabled
    }

    @Field(type => Boolean)
    async canChangeLicense(){
        const hasRole = await useContextUserGroupRolesInclude('ORGANISATION_LICENSE')
        return hasRole
    }

    @Field(type => Boolean)
    async canImport(){
        // Todo : add role "ORGANISATION_DATA" later to control this
        return true
    }

    @Field(type => Boolean)
    async canExport(){
        return true
    }

    @Field(type => Boolean)
    async isOwner(){
        return (await this.userCreator)?.id === (await useContextUser())?.id
    }

    @Field(type => Boolean)
    async isSameOrganisation(){
        // Todo : create an organisation switch on the front end to make the comparison
        return false
    }

    @Field(type => Boolean)
    async isEditable(){        
        if (await this.isOwner()) {
            return true
        }

        const organisations = await useContextUserOrganisations()
        const isAttachedToOrganisation = organisations.some((item) => item.id === this.id)
        if (!isAttachedToOrganisation) {
            return false
        }

        if (await useContextUserGroupRolesInclude('ORGANISATION_MANAGE_USER')) {
            return true
        }

        return TUserOrganisation.canCreate()
    }

    @Field(type => Boolean)
    isDeletable(){
        return false
    }

    static canCreate = async () => {
        const user = await useContextUser()
        return user !== undefined
    }

    static dataFilter = async (options: FindManyOptions): Promise<FindManyOptions> => {
        const organisation = await useContextOrganisationActive()
        if (organisation) {
            if ((await useContextUserGroupRolesInclude('ORGANISATION_LICENSE'))) {
                return options
            }

            return {
                ...options,
                where: { 
                    ...options.where, 
                    id: organisation?.id
                }
            }
        }

        const user = await useContextUser()
        if (user) {
            return {
                ...options,
                where: [
                    { 
                        ...options.where, 
                        groups: {
                            invitations: {
                                user: { id: user.id },
                                status: 'ACTIVE'
                            }
                        }
                    },
                    { 
                        ...options.where, 
                        groups: {
                            userCreator: { id: user.id },
                        }
                    }
                ]
            }
        }

        return {
            ...options,
            where: { 
                ...options.where, 
                id: 0
            }
        }
    }
}


@ObjectType()
export class TUserOrganisationsResponse extends TQueryResponse {
    @Field(() => [TUserOrganisation])
    data: TUserOrganisation[];
}
