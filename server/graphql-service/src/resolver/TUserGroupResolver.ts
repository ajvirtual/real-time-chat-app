
            
import { Resolver, Query, Arg, Mutation, Ctx, Info, Root, FieldResolver } from "type-graphql";
import { GraphQLResolveInfo } from "graphql/type/definition";
import { 
    TAppContext, 
    TDelete,
    useContextUser,
    useContextOrganisationActive
} from "@chat/graphql";
import { TUserGroup, TUserGroupsResponse } from "@chat/graphql";
import { TUserGroupInvitation } from "@chat/graphql";
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
@Resolver(() => TUserGroup)
export class TUserGroupResolver {

                
    @Query(() => Number)
    async userGroupCount(@Arg("filter", { nullable: true }) filter?: TFilter) {
        const { total } = await useGenericResolverFieldsDataMany({ className: "TUserGroup", filter })
        return total
    }    

                
    @Query(() => TUserGroupsResponse)
    async userGroups(@Arg("filter", { nullable: true }) filter?: TFilter) {
        return useGenericResolverFieldsDataMany({ className: "TUserGroup", filter })
    }    

                
@Query(() => TUserGroup)
async userGroup(@Arg("filter", { nullable: true }) filter?: TFilter) {
    return useGenericResolverFieldsDataOne({ className: "TUserGroup", filter })
} 

                
@Mutation(() => TSaveOrUpdateResponse)
async saveUserGroup(@Arg("data") data: TSaveOrUpdate<TUserGroup>) {
    const user = await useContextUser()
    const organisation = await useContextOrganisationActive()
    return useGenericResolverSave({ name: "userGroup", data, user, organisation })
}

                
@Mutation(() => Boolean)
async deleteUserGroup(@Arg("data") data: TDelete) {
    return useGenericResolverDelete({ className: "TUserGroup", ids: data.ids || [] })
}

                
    @FieldResolver(() => [TUserGroupInvitation], { nullable: true })
    async invitations (@Root() item: TUserGroupInvitation, @Arg("filter", { nullable: true }) filter?: TFilter) {
        const _filter = { ...filter, data: { ...(filter?.data || {}), group: { id: item.id } } }
        const { data } = await useGenericResolverFieldsDataMany({ className: "TUserGroupInvitation", filter: _filter })
        return data
    }
                
    @FieldResolver(() => Number, { nullable: true })
    async invitationsCount (@Root() item: TUserGroupInvitation, @Arg("filter", { nullable: true }) filter?: TFilter) {
        const _filter = { ...filter, data: { ...(filter?.data || {}), group: { id: item.id } } }
        const { total } = await useGenericResolverFieldsDataMany({ className: "TUserGroupInvitation", filter: _filter })
        return total
    }
            
}
    
        