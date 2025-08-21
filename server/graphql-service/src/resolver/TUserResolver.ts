
            
import { Resolver, Query, Arg, Mutation, Ctx, Info, Root, FieldResolver } from "type-graphql";
import { GraphQLResolveInfo } from "graphql/type/definition";
import { 
    TAppContext, 
    TDelete,
    useContextUser,
    useContextOrganisationActive
} from "@chat/graphql";
import { TUser, TUsersResponse } from "@chat/graphql";
import { TSessionUser,TUserGroupInvitation } from "@chat/graphql";
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
@Resolver(() => TUser)
export class TUserResolver {

                
    @Query(() => Number)
    async userCount(@Arg("filter", { nullable: true }) filter?: TFilter) {
        const { total } = await useGenericResolverFieldsDataMany({ className: "TUser", filter })
        return total
    }    

                
    @Query(() => TUsersResponse)
    async users(@Arg("filter", { nullable: true }) filter?: TFilter) {
        return useGenericResolverFieldsDataMany({ className: "TUser", filter })
    }    

                
@Query(() => TUser)
async user(@Arg("filter", { nullable: true }) filter?: TFilter) {
    return useGenericResolverFieldsDataOne({ className: "TUser", filter })
} 

                
@Mutation(() => TSaveOrUpdateResponse)
async saveUser(@Arg("data") data: TSaveOrUpdate<TUser>) {
    const user = await useContextUser()
    const organisation = await useContextOrganisationActive()
    return useGenericResolverSave({ name: "user", data, user, organisation })
}

                
@Mutation(() => Boolean)
async deleteUser(@Arg("data") data: TDelete) {
    return useGenericResolverDelete({ className: "TUser", ids: data.ids || [] })
}

                
    @FieldResolver(() => [TSessionUser], { nullable: true })
    async sessionUsers (@Root() item: TSessionUser, @Arg("filter", { nullable: true }) filter?: TFilter) {
        const _filter = { ...filter, data: { ...(filter?.data || {}), user: { id: item.id } } }
        const { data } = await useGenericResolverFieldsDataMany({ className: "TSessionUser", filter: _filter })
        return data
    }

    @FieldResolver(() => [TUserGroupInvitation], { nullable: true })
    async invitations (@Root() item: TUserGroupInvitation, @Arg("filter", { nullable: true }) filter?: TFilter) {
        const _filter = { ...filter, data: { ...(filter?.data || {}), user: { id: item.id } } }
        const { data } = await useGenericResolverFieldsDataMany({ className: "TUserGroupInvitation", filter: _filter })
        return data
    }
                
    @FieldResolver(() => Number, { nullable: true })
    async sessionUsersCount (@Root() item: TSessionUser, @Arg("filter", { nullable: true }) filter?: TFilter) {
        const _filter = { ...filter, data: { ...(filter?.data || {}), user: { id: item.id } } }
        const { total } = await useGenericResolverFieldsDataMany({ className: "TSessionUser", filter: _filter })
        return total
    }

    @FieldResolver(() => Number, { nullable: true })
    async invitationsCount (@Root() item: TUserGroupInvitation, @Arg("filter", { nullable: true }) filter?: TFilter) {
        const _filter = { ...filter, data: { ...(filter?.data || {}), user: { id: item.id } } }
        const { total } = await useGenericResolverFieldsDataMany({ className: "TUserGroupInvitation", filter: _filter })
        return total
    }
            
}
    
        