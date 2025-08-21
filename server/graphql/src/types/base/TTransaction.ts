import { Metadata } from '@mzara/graphql-service-core'
import { MetadataClass } from '@mzara/graphql-service-core'
import { Field, ObjectType } from "type-graphql"
import { Column, Entity, ManyToOne } from "typeorm"
import { TProductLicense } from './TProductLicense'
import { TQueryResponse } from './TBase'
import { TEntityUserCreator } from './TEntityUserCreator'

@Entity()
@ObjectType()
@MetadataClass({ name: 'transaction' })
export class TTransaction extends TEntityUserCreator {

    @Field(() => String)
    @Column({ type: 'varchar', length: '255', nullable: true })
    @Metadata({ readonly: true })
    ke: string

    /**
     * MVOLA
     * ORANGE_MONEY
     * AIRTEL_MONEY
     */
    @Field(() => String)
    @Column({ type: 'varchar', length: '255' })
    @Metadata({ readonly: true })
    type: 'MVOLA' | 'ORANGE_MONEY' | 'AIRTEL_MONEY' | 'FORCED'

    @Field(() => String)
    @Column({ type: 'varchar', length: '255', nullable: true })
    @Metadata({ readonly: true })
    status: 'NEW' | 'PENDING' | 'SUCCESS' | 'FAILED'

    @Field(() => String)
    @Column({ type: 'varchar', length: '255', nullable: true })
    @Metadata({ readonly: true })
    reference?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'text', charset: 'utf8mb4', collation: 'utf8mb4_general_ci', nullable: true })
    @Metadata({ readonly: true })
    referenceData?: string

    @Field(() => Date, { nullable: true })
    @Column({ type: 'datetime', nullable: true})
    @Metadata({ readonly: true })
    dateBegin?: string

    @Field(() => Date, { nullable: true })
    @Column({ type: 'datetime', nullable: true})
    @Metadata({ readonly: true })
    dateEnd?: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'text', charset: 'utf8mb4', collation: 'utf8mb4_general_ci', nullable: true })
    @Metadata()
    comment?: string
    
    @Field(() => TProductLicense, { nullable: true })
    @ManyToOne(() => TProductLicense, { lazy: true, nullable: true })
    @Metadata({ relation: 'TProductLicense' })
    license?: TProductLicense

    @Field(type => Boolean)
    canRead() {
        return true
    }

    @Field(type => Boolean)
    async isEditable() {
        return false
    }

    @Field(type => Boolean)
    async isDeletable() {
        return false
    }
}


@ObjectType()
export class TTransactionsResponse extends TQueryResponse {
    @Field(() => [TTransaction])
    data: TTransaction[];
}

