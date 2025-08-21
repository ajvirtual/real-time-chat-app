import { MetadataClass } from '@mzara/graphql-service-core'
import { Field, ObjectType } from 'type-graphql';
import { JoinColumn, ManyToOne } from 'typeorm';
import { TUserOrganisation } from './TUserOrganisation';
import { TEntityUserCreator } from './TEntityUserCreator';
import { useContextOrganisationActive } from '@hooks/context/useContextOrganisationActive';

@ObjectType()
@MetadataClass()
export class TEntityOrganisation extends TEntityUserCreator {

    @ManyToOne(() => TUserOrganisation, {nullable: true, lazy: true})
    @JoinColumn()
    @Field(() => TUserOrganisation)
    organisation?: TUserOrganisation

    static attachedToOrganisation: boolean = true

    @Field(type => Boolean)
    async isSameOrganisation(){
        const organisation = await this.organisation
        const _organisation = await useContextOrganisationActive()
        if(!organisation || !_organisation) return false
        return organisation?.id! === _organisation.id!
    }

    @Field(type => Boolean)
    async isEditable(){
        return this.isSameOrganisation()
    }

    @Field(type => Boolean)
    async isDeletable(){
        return this.isSameOrganisation()
    }
}
