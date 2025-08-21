import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { TTimeStamp } from './TTimeStamp';
import { TSessionUser } from './TSessionUser';
import { Metadata } from '@mzara/graphql-service-core'

@Entity()
@ObjectType()
export class TAutomation extends TTimeStamp {

    @Field(() => String, { nullable: true })
    @Column({ type: 'text', nullable: true })
    entity?: string

    @Field(() => String)
    @Column({ type: 'varchar', length: '125' })
    type: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'mediumtext', charset: 'utf8mb4', collation: 'utf8mb4_general_ci', nullable: true })
    @Metadata({ searchable: false, readonly: true })
    logs?: string
    
    @Field(() => Date, { nullable: true })
    @Column({ type: 'datetime', nullable: true})
    @Metadata()
    dateBegin?: string

    @Field(() => Date, { nullable: true })
    @Column({ type: 'datetime', nullable: true})
    @Metadata()
    dateEnd?: string
    
}
