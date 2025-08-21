
            
import { Resolver, Query, Arg, Mutation, Ctx, Info, Root, FieldResolver } from "type-graphql";
import { GraphQLResolveInfo } from "graphql/type/definition";
import { 
    TAppContext, 
    TDelete,
    useContextUser,
    useContextOrganisationActive
} from "@chat/graphql";
import { TSession, TSessionsResponse } from "@chat/graphql";
import { TSessionUser } from "@chat/graphql";
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
@Resolver(() => TSession)
export class TSessionResolver {

                
    @Query(() => Number)
    async sessionCount(@Arg("filter", { nullable: true }) filter?: TFilter) {
        const { total } = await useGenericResolverFieldsDataMany({ className: "TSession", filter })
        return total
    }    

                
    @Query(() => TSessionsResponse)
    async sessions(@Arg("filter", { nullable: true }) filter?: TFilter) {
        return useGenericResolverFieldsDataMany({ className: "TSession", filter })
    }    

                
@Query(() => TSession)
async session(@Arg("filter", { nullable: true }) filter?: TFilter) {
    return useGenericResolverFieldsDataOne({ className: "TSession", filter })
} 

                
@Mutation(() => TSaveOrUpdateResponse)
async saveSession(@Arg("data") data: TSaveOrUpdate<TSession>) {
    const user = await useContextUser()
    const organisation = await useContextOrganisationActive()
    return useGenericResolverSave({ name: "session", data, user, organisation })
}

                
@Mutation(() => Boolean)
async deleteSession(@Arg("data") data: TDelete) {
    return useGenericResolverDelete({ className: "TSession", ids: data.ids || [] })
}

                
    @FieldResolver(() => [TSessionUser], { nullable: true })
    async sessionUsers (@Root() item: TSessionUser, @Arg("filter", { nullable: true }) filter?: TFilter) {
        const _filter = { ...filter, data: { ...(filter?.data || {}), session: { id: item.id } } }
        const { data } = await useGenericResolverFieldsDataMany({ className: "TSessionUser", filter: _filter })
        return data
    }
                
    @FieldResolver(() => Number, { nullable: true })
    async sessionUsersCount (@Root() item: TSessionUser, @Arg("filter", { nullable: true }) filter?: TFilter) {
        const _filter = { ...filter, data: { ...(filter?.data || {}), session: { id: item.id } } }
        const { total } = await useGenericResolverFieldsDataMany({ className: "TSessionUser", filter: _filter })
        return total
    }
            
}
    
        