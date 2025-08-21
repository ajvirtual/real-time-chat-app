import { Metadata } from '@mzara/graphql-service-core'
import { MetadataClass } from '@mzara/graphql-service-core'
import { Field, ObjectType } from "type-graphql"
import { Column, Entity, ManyToOne } from "typeorm"
import { TSessionUser } from "./TSessionUser"
import { TBase, TQueryResponse } from './TBase'

@Entity()
@ObjectType()
@MetadataClass({ name: 'sessionUserDate' })
export class TSessionUserDate extends TBase {

    @ManyToOne(() => TSessionUser, { nullable: true, lazy: true, cascade: ['remove', 'update'] })
    @Field(() => TSessionUser)
    sessionUser: TSessionUser
    
    @Field(() => Date)
    @Column({ type: 'datetime' })
    @Metadata()
    dateBegin: string

    @Field(() => Date, { nullable: true })
    @Column({ type: 'datetime', nullable: true})
    @Metadata()
    dateEnd?: string

    @Field(type => Boolean)
    isEditable(){
        return false
    }
    
    @Field(type => Boolean)
    isDeletable(){
        return false
    }

    static canCreate = () => {
        return false
    }
}

@ObjectType()
export class TSessionUserDatesResponse extends TQueryResponse {
    @Field(() => [TSessionUserDate])
    data: TSessionUserDate[];
}

