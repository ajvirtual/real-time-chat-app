import { TTimeStamp } from "@_types/base/TTimeStamp"
import { Metadata } from '@mzara/graphql-service-core'
import { MetadataClass } from '@mzara/graphql-service-core'
import { Field, ObjectType } from "type-graphql"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { TSession } from "./TSession"
import { TSessionUserDate } from "./TSessionUserDate"
import { TUser } from "./TUser"
import moment from "moment"
import { TUserOrganisation } from "./TUserOrganisation"
import { TQueryResponse } from "./TBase"

@Entity()
@ObjectType()
@MetadataClass({ name: 'sessionUser', readonly: true })
export class TSessionUser extends TTimeStamp {

    @ManyToOne(() => TSession, {nullable: true, lazy: true})
    @JoinColumn()
    @Field(() => TSession)
    @Metadata({ relation: 'TUser', readonly: true })
    session: TSession

    @ManyToOne(() => TUserOrganisation, {nullable: true, lazy: true})
    @Field(() => TUserOrganisation)
    organisation?: TUserOrganisation

    @ManyToOne(() => TUser, (user) => user.sessionUsers, {nullable: true, lazy: true})
    @Field(() => TUser, { nullable: true })
    @Metadata({ relation: 'TUser', readonly: true })
    user: TUser

    @Field(() => Boolean, { defaultValue: false })
    @Column({ type: 'tinyint', default: false })
    @Metadata()
    remember: boolean

    @Field(() => Boolean, { defaultValue: false })
    @Column({ type: 'tinyint', default: false })
    @Metadata()
    authenticated: boolean

    @Field(() => Boolean, { defaultValue: false })
    @Column({ type: 'tinyint', default: false })
    @Metadata()
    active: boolean

    @OneToMany(() => TSessionUserDate, (sessionUserDate) => sessionUserDate.sessionUser, { lazy: true, nullable: true })
    @Field(() => [TSessionUserDate])
    @Metadata({ relation: 'TSessionUserDate', relationInverseSide: 'sessionUser', readonly: true, multiple: true })
    sessionUserDates?: TSessionUserDate[]
    
    @Field(type => Boolean)
    isEditable(){
        return false
    }

    @Field(type => Boolean)
    isDeletable(){
        return false
    }

    @Field(type => Boolean)
    async isActive(){
        const lastUserDate = (await TSessionUserDate.find({
            where: {
                sessionUser: {
                    id: this.id
                }
            },
            order: {
                id: "DESC"
            },
            take: 1
        }))[0]

        if(!lastUserDate?.dateEnd){
            return true
        }

        if(moment().diff(moment(lastUserDate?.dateEnd), "second") < 30){
            return true
        }

        return false
    }

    static canCreate = () => {
        return false
    }
}


@ObjectType()
export class TSessionUsersResponse extends TQueryResponse {
    @Field(() => [TSessionUser])
    data: TSessionUser[];
}
