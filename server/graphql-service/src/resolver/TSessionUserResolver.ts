
            
import { Resolver, Query, Arg, Mutation, Ctx, Info, Root, FieldResolver } from "type-graphql";
import { GraphQLResolveInfo } from "graphql/type/definition";
import { 
    TAppContext, 
    TDelete,
    useContextUser,
    useContextOrganisationActive
} from "@chat/graphql";
import { TSessionUser, TSessionUsersResponse } from "@chat/graphql";
import { TSessionUserDate } from "@chat/graphql";
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
@Resolver(() => TSessionUser)
export class TSessionUserResolver {

                
    @Query(() => Number)
    async sessionUserCount(@Arg("filter", { nullable: true }) filter?: TFilter) {
        const { total } = await useGenericResolverFieldsDataMany({ className: "TSessionUser", filter })
        return total
    }    

                
    @Query(() => TSessionUsersResponse)
    async sessionUsers(@Arg("filter", { nullable: true }) filter?: TFilter) {
        return useGenericResolverFieldsDataMany({ className: "TSessionUser", filter })
    }    

                
@Query(() => TSessionUser)
async sessionUser(@Arg("filter", { nullable: true }) filter?: TFilter) {
    return useGenericResolverFieldsDataOne({ className: "TSessionUser", filter })
} 

                
@Mutation(() => TSaveOrUpdateResponse)
async saveSessionUser(@Arg("data") data: TSaveOrUpdate<TSessionUser>) {
    const user = await useContextUser()
    const organisation = await useContextOrganisationActive()
    return useGenericResolverSave({ name: "sessionUser", data, user, organisation })
}

                
@Mutation(() => Boolean)
async deleteSessionUser(@Arg("data") data: TDelete) {
    return useGenericResolverDelete({ className: "TSessionUser", ids: data.ids || [] })
}

                
    @FieldResolver(() => [TSessionUserDate], { nullable: true })
    async sessionUserDates (@Root() item: TSessionUserDate, @Arg("filter", { nullable: true }) filter?: TFilter) {
        const _filter = { ...filter, data: { ...(filter?.data || {}), sessionUser: { id: item.id } } }
        const { data } = await useGenericResolverFieldsDataMany({ className: "TSessionUserDate", filter: _filter })
        return data
    }
                
    @FieldResolver(() => Number, { nullable: true })
    async sessionUserDatesCount (@Root() item: TSessionUserDate, @Arg("filter", { nullable: true }) filter?: TFilter) {
        const _filter = { ...filter, data: { ...(filter?.data || {}), sessionUser: { id: item.id } } }
        const { total } = await useGenericResolverFieldsDataMany({ className: "TSessionUserDate", filter: _filter })
        return total
    }
            
}
    
        