import { useContextUser, useContextUserGroupRolesInclude } from "@hooks/context"
import { TTimeStamp } from "@_types/base/TTimeStamp"
import { Metadata } from '@mzara/graphql-service-core'
import { MetadataClass } from '@mzara/graphql-service-core'
import { Field, ObjectType } from "type-graphql"
import { Column, Entity, OneToMany } from "typeorm"
import { TSessionUser } from "./TSessionUser"
import { TQueryResponse } from "./TBase"

@Entity()
@ObjectType()
@MetadataClass({ name: 'session', readonly: true })
export class TSession extends TTimeStamp {

    @Metadata()
    @Column({ type: 'varchar', length: '50' })
    token: string

    @Field(() => String, { nullable: true })
    @Metadata()
    @Column({ type: 'varchar', length: '250' })
    userAgent: string

    @Field(() => String, { nullable: true })
    @Metadata()
    @Column({ type: 'varchar', length: '75' })
    browser: string

    @Field(() => String, { nullable: true })
    @Metadata()
    @Column({ type: 'varchar', length: '20' })
    browserVersion: string

    @Field(() => String, { nullable: true })
    @Metadata()
    @Column({ type: 'varchar', length: '50', nullable: true })
    mobileName?: string

    @Field(() => String, { nullable: true })
    @Metadata()
    @Column({ type: 'varchar', length: '50', nullable: true })
    robotName?: string

    @Field(() => String, { nullable: true })
    @Metadata()
    @Column({ type: 'varchar', length: '225', nullable: true })
    referer?: string

    @Field(() => String, { nullable: true })
    @Metadata()
    @Column({ type: 'varchar', length: '125', nullable: true })
    plateform?: string

    @Field(() => String, { nullable: true })
    @Metadata()
    @Column({ type: 'varchar', length: '50', nullable: true })
    device?: string

    @Field(() => String, { nullable: true })
    @Metadata()
    @Column({ type: 'text', nullable: true })
    userAgentJson?: string

    @Field(() => String, { nullable: true })
    @Metadata()
    @Column({ type: 'varchar', length: '225', nullable: true })
    fcmToken?: string

    @Field(() => Date, { nullable: true })
    @Column({ type: 'timestamp', nullable: true})
    @Metadata()
    fcmDateRevoked?: string

    @OneToMany(() => TSessionUser, (sessionUser) => sessionUser.session, { nullable: true, lazy: true })
    @Field(() => [TSessionUser])
    @Metadata({ relation: 'TSessionUser', relationInverseSide: 'session', readonly: true, multiple: true })
    sessionUsers?: TSessionUser[]

    @Field(type => Boolean)
    async getActiveSessionUser() {
        const sessionUser = await TSessionUser.findOne({
            where: { active: true, session: { id: this.id } }
        })

        return sessionUser
    }

    @Field(type => Boolean)
    async canDeconnect(){
        const userContext = await useContextUser()
        const sessionUserActive = await this.getActiveSessionUser()
        const userConnected = await sessionUserActive.user

        if (userContext.id === userConnected.id) {
            return true;
        }

        const isPublic = (await useContextUser())?.profilePublic;
        const role = isPublic ? 'ORGANISATION_LICENSE' : 'ORGANISATION_MANAGE_USER';
        return await useContextUserGroupRolesInclude(role);
    }

    @Field(type => Boolean)
    async isEditable(){
        
        return false
    }

    @Field(type => Boolean)
    isDeletable(){
        return false
    }

    @Field(type => Boolean)
    async isActive() {
        const sessions = await this.sessionUsers
        const sessionsUserActive = await Promise.all(sessions.map((item) => item.isActive()))

        return sessionsUserActive.some((item) => item === true)
    }

    static canCreate = () => {
        return false
    }
}


@ObjectType()
export class TSessionsResponse extends TQueryResponse {
    @Field(() => [TSession])
    data: TSession[];
}
