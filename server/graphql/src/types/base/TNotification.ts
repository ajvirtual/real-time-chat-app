import { Entity, Column, ManyToOne, FindManyOptions } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { TTimeStamp } from './TTimeStamp';
import { Metadata } from '@mzara/graphql-service-core'
import { TUser } from './TUser';
import { MetadataClass } from '@mzara/graphql-service-core'
import { TQueryResponse } from './TBase';
import { useContextUser } from '@hooks/context';

@Entity()
@ObjectType()
@MetadataClass({ name: 'notification' })
export class TNotification extends TTimeStamp {

    @Field(() => String, { nullable: true })
    @Column({ type: 'text', nullable: true })
    @Metadata({ readonly: true })
    entity?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata({ readonly: true })
    entityId?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', nullable: true })
    @Metadata({ readonly: true })
    ke: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', nullable: true })
    @Metadata({ readonly: true })
    technicalDescription?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', nullable: true })
    @Metadata({ readonly: true })
    imageUrl: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', nullable: true })
    @Metadata({ readonly: true })
    icon: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'text', nullable: true })
    @Metadata({ readonly: true })
    link?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', length: '500', nullable: true })
    @Metadata({ readonly: true })
    acceptLink?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', length: '500', nullable: true })
    @Metadata({ readonly: true })
    declineLink?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    @Metadata({ readonly: true })
    title?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'text', nullable: true })
    @Metadata({ readonly: true })
    message?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'text', nullable: true })
    @Metadata({ readonly: true })
    variables?: string

    @Field(() => Date, { nullable: true })
    @Column({ type: 'datetime', nullable: true})
    @Metadata({ readonly: true })
    dateNotification?: string

    @Field(() => Date, { nullable: true })
    @Column({ type: 'datetime', nullable: true})
    @Metadata({ readonly: true })
    dateNotificationSent?: string
    
    @Field(() => Date, { nullable: true })
    @Column({ type: 'datetime', nullable: true})
    @Metadata()
    dateRead?: string

    @Field(() => Date, { nullable: true })
    @Column({ type: 'datetime', nullable: true})
    @Metadata()
    dateOpened?: string

    @Field(() => Boolean, { defaultValue: false })
    @Column({ type: 'tinyint', default: false })
    @Metadata()
    pushNotification: boolean

    @Field(() => Boolean, { defaultValue: false })
    @Column({ type: 'tinyint', default: false })
    @Metadata()
    sendEmail: boolean
    
    @Field(() => TUser, { nullable: true })
    @ManyToOne(() => TUser, { lazy: true, nullable: true })
    @Metadata({ relation: 'TUser', readonly: true })
    user?: TUser

    @Field(type => Boolean)
    async isEditable(){
        const user = await useContextUser()
        return (await this.user)?.id === user?.id
    }

    @Field(type => Boolean)
    isDeletable(){
        return this.isEditable()
    }

    static dataFilter = async (options: FindManyOptions): Promise<FindManyOptions> => {

        const user = await useContextUser()
        if (user) {
            return {
                ...options,
                where: { 
                    ...options.where, 
                    user: { id: user.id }
                }
            }
        }
        throw 'FORBIDDEN'
    }

    static canCreate = async () => {
        return false
    }
}

@ObjectType()
export class TNotificationsResponse extends TQueryResponse {
    @Field(() => [TNotification])
    data: TNotification[];
}
