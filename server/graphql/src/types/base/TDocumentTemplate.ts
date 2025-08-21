import { MetadataClass } from '@mzara/graphql-service-core'
import { Field, ObjectType } from "type-graphql"
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm"
import { TSoftDeleteEntity } from "./TSoftDeleteEntity"
import { Metadata } from '@mzara/graphql-service-core'
import { TUserOrganisation } from './TUserOrganisation'
import { TDescriptor } from './TDescriptor'
import { TFile } from './TFile'
import { TQueryResponse } from './TBase'

@Entity()
@ObjectType()
@MetadataClass({ name: 'documentTemplate' })
export class TDocumentTemplate  extends TSoftDeleteEntity {

    @Field(() => String)
    @Column({ type: 'varchar', length: '255' })
    @Metadata()
    ke: string

    /**
     * FICHE_USER_PAY_SLIP_TEMPLATE
     * CONTRACT_LEAVING
     */
    @Field(() => String)
    @Column({ type: 'varchar', length: '255' })
    @Metadata()
    tp: string

    @ManyToOne(() => TUserOrganisation, {nullable: true, lazy: true})
    @JoinColumn()
    @Field(() => TUserOrganisation)
    organisation?: TUserOrganisation
    
    @Field(() => String)
    @Column({ type: 'varchar', length: '255' })
    @Metadata()
    name: string

    @Field(() => String, { nullable: true })
    @Column({ type: 'text', nullable: true })
    @Metadata()
    description?: string

    @Field(() => Boolean, { defaultValue: false })
    @Column({ type: 'tinyint', default: false })
    @Metadata()
    isActive: boolean

    @Field(() => TFile, { nullable: true })
    @ManyToOne(() => TFile, { lazy: true, nullable: true })
    @Metadata({ relation: 'TFile' })
    file?: TFile

    /**
     * tp : 'DOCUMENT_TEMPLATE'
     */
    @Field(() => TDescriptor, { nullable: true })
    @ManyToOne(() => TDescriptor, { lazy: true, nullable: true })
    @Metadata({ relation: 'TDescriptor' })
    type?: TDescriptor

    @Field(type => Boolean)
    canRead() {
        return true
    }

    @Field(type => Boolean)
    isEditable() {
        return true
    }

    @Field(type => Boolean)
    isDeletable() {
        return true
    }
}


@ObjectType()
export class TDocumentTemplatesResponse extends TQueryResponse {
    @Field(() => [TDocumentTemplate])
    data: TDocumentTemplate[];
}

