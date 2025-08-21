import { useContextOrganisationActive, useContextUser } from "@hooks/context"
import { Metadata } from '@mzara/graphql-service-core'
import { MetadataClass } from '@mzara/graphql-service-core'
import { Field, ObjectType } from "type-graphql"
import { Column, Entity, FindManyOptions, IsNull, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { TQueryResponse } from "./TBase"
import { TEntityUserCreator } from "./TEntityUserCreator"
import { TEntityOrganisation } from "./TEntityOrganisation"

@Entity()
@ObjectType()
@MetadataClass({ name: 'listOfValue' })
export class TListOfValue extends TEntityOrganisation {
    
    @Field(() => String, { nullable: true })
    @Metadata()
    @Column({ nullable: true })
    valueKey?: string

    @Field(() => String)
    @Metadata()
    @Column()
    value?: string

    @Field(() => String, { nullable: true })
    @Metadata()
    @Column({ nullable: true })
    color?: string

    @Field(() => String)
    @Metadata()
    @Column()
    tp?: string

    @OneToOne(() => TListOfValue, { nullable: true })
    @JoinColumn({ name: "lov_id" })
    @Field(() => TListOfValue, { nullable: true })
    @Metadata({ relation: 'TListOfValue' })
    listOfValue?: TListOfValue

    @OneToMany(() => TListOfValue, (lov) => lov.listOfValue, { nullable: true, lazy: true })
    @Field(() => [TListOfValue], { nullable: true })
    @Metadata({ relation: 'TListOfValue' })
    listOfValues?: TListOfValue[]

    @Field(() => Boolean, { defaultValue: false })
    @Column({ type: 'tinyint', default: false })
    @Metadata()
    isPublic: boolean

    @Field(type => Boolean)
    canRead(): Promise<boolean> | boolean {
        return TListOfValue.canCreate()
    }

    @Field(type => Boolean)
    isEditable(){
        return this.isSameOrganisation()
    }

    @Field(type => Boolean)
    isDeletable(){
        return this.isEditable()
    }

    static canCreate = async () => {
        const user = await useContextUser()
        return Boolean(user)
    }
    
    static dataFilter = async (options: FindManyOptions): Promise<FindManyOptions> => {

        const organisation = await useContextOrganisationActive()

        if (organisation) {
            return {
                ...options,
                where: { 
                    ...options.where, 
                    organisation: {
                        id: organisation?.id
                    }
                }
            }
        }
        return {
            ...options,
            where: { 
                ...options.where,
                organisation: {
                    id: IsNull()
                }
            }
        }
    }
}

@ObjectType()
export class TListOfValuesResponse extends TQueryResponse {
    @Field(() => [TListOfValue])
    data: TListOfValue[];
}
