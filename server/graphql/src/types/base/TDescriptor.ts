import { Metadata } from '@mzara/graphql-service-core'
import { MetadataClass } from '@mzara/graphql-service-core'
import { Field, ObjectType } from "type-graphql"
import { Column, Entity } from "typeorm"
import { TBase, TEntityFn, TQueryResponse } from "./TBase"
@Entity()
@ObjectType()
@MetadataClass({ name: 'descriptor', readonly: true })
export class TDescriptor extends TBase {
    
    @Field(() => String)
    @Metadata()
    @Column({ type: 'varchar', length: '225', nullable: true })
    descriptorKey?: string

    @Field(() => String)
    @Metadata()
    @Column({ type: 'varchar', length: '500', nullable: true })
    value?: string

    @Field(() => String)
    @Metadata()
    @Column({ type: 'varchar', length: '125', nullable: true })
    tp?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true, default: 'ACTIVE' })
    @Metadata()
    state?: 'ACTIVE' | 'INACTIVE'

    @Field(() => String)
    @Metadata()
    @Column({ type: 'text', nullable: true })
    comment?: string

    @Field(() => Number, { nullable: true })
    @Column({ type: 'decimal', default: 0, precision: 12, scale: 3 })
    @Metadata()
    amount?: number

    @Field(() => Number, { nullable: true })
    @Column({ type: 'decimal', default: 0, precision: 12, scale: 3 })
    @Metadata()
    amount2?: number

    @Field(() => String, { nullable: true })
    @Metadata()
    translationKey(){
        return `Generic.de.${this.value}`
    }
}

@ObjectType()
export class TDescriptorsResponse extends TQueryResponse {
    @Field(() => [TDescriptor])
    data: TDescriptor[];
}
