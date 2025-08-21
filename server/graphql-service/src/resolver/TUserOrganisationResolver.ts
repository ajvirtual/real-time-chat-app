
            
import { Resolver, Query, Arg, Mutation, Ctx, Info, Root, FieldResolver } from "type-graphql";
import { GraphQLResolveInfo } from "graphql/type/definition";
import { 
    TAppContext, 
    TDelete,
    useContextUser,
    useContextOrganisationActive
} from "@chat/graphql";
import { TUserOrganisation, TUserOrganisationsResponse } from "@chat/graphql";
import { TUserGroup } from "@chat/graphql";
import { 
    TFilter,
    TSaveOrUpdate,
    TSaveOrUpdateResponse,
    useGenericResolverDelete, 
    useGenericResolverSave,
    useGenericResolverFieldsDataOne,
    useGenericResolverFieldsDataMany
} from "@mzara/graphql-service-core";
    
            
/**
 * ------------------
 * This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
 * ------------------
 */
@Resolver(() => TUserOrganisation)
export class TUserOrganisationResolver {

                
    @Query(() => Number)
    async userOrganisationCount(@Arg("filter", { nullable: true }) filter?: TFilter) {
        const { total } = await useGenericResolverFieldsDataMany({ className: "TUserOrganisation", filter })
        return total
    }    

                
    @Query(() => TUserOrganisationsResponse)
    async userOrganisations(@Arg("filter", { nullable: true }) filter?: TFilter) {
        return useGenericResolverFieldsDataMany({ className: "TUserOrganisation", filter })
    }    

                
@Query(() => TUserOrganisation)
async userOrganisation(@Arg("filter", { nullable: true }) filter?: TFilter) {
    return useGenericResolverFieldsDataOne({ className: "TUserOrganisation", filter })
} 

                
@Mutation(() => TSaveOrUpdateResponse)
async saveUserOrganisation(@Arg("data") data: TSaveOrUpdate<TUserOrganisation>) {
    const user = await useContextUser()
    const organisation = await useContextOrganisationActive()
    return useGenericResolverSave({ name: "userOrganisation", data, user, organisation })
}

                
@Mutation(() => Boolean)
async deleteUserOrganisation(@Arg("data") data: TDelete) {
    return useGenericResolverDelete({ className: "TUserOrganisation", ids: data.ids || [] })
}

                
    @FieldResolver(() => [TUserGroup], { nullable: true })
    async groups (@Root() item: TUserGroup, @Arg("filter", { nullable: true }) filter?: TFilter) {
        const _filter = { ...filter, data: { ...(filter?.data || {}), organisation: { id: item.id } } }
        const { data } = await useGenericResolverFieldsDataMany({ className: "TUserGroup", filter: _filter })
        return data
    }
                
    @FieldResolver(() => Number, { nullable: true })
    async groupsCount (@Root() item: TUserGroup, @Arg("filter", { nullable: true }) filter?: TFilter) {
        const _filter = { ...filter, data: { ...(filter?.data || {}), organisation: { id: item.id } } }
        const { total } = await useGenericResolverFieldsDataMany({ className: "TUserGroup", filter: _filter })
        return total
    }
            
}
    
        