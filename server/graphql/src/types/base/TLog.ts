import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { TTimeStamp } from './TTimeStamp';
import { TSessionUser } from './TSessionUser';

@Entity()
@ObjectType()
export class TLog extends TTimeStamp {

    @Field(() => String, { nullable: true })
    @Column({ type: 'text', nullable: true })
    entity?: string

    @Field(() => String)
    @Column({ type: 'varchar', length: '125' })
    tp: string

    @Field(() => String)
    @Column({ type: 'varchar', default: 'unknown', length: '125' })
    app_name: string
    
    @Field(() => String, { nullable: true })
    @Column({ type: 'text', nullable: true })
    req?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', length: '10', nullable: true })
    req_method?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'text', nullable: true })
    req_data?: string

    @Field(() => Number)
    @Column({ type: 'smallint' })
    res_code: number
    
    @ManyToOne(() => TSessionUser, { nullable: true, lazy: true, cascade: ['remove', 'update'] })
    @JoinColumn()
    @Field(() => TSessionUser)
    sessionUser: TSessionUser
}
