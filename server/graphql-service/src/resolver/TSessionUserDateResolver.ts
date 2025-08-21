
            
import { Resolver, Query, Arg, Mutation, Ctx, Info, Root, FieldResolver } from "type-graphql";
import { GraphQLResolveInfo } from "graphql/type/definition";
import { 
    TAppContext, 
    TDelete,
    useContextUser,
    useContextOrganisationActive
} from "@chat/graphql";
import { TSessionUserDate, TSessionUserDatesResponse } from "@chat/graphql";
import {  } from "@chat/graphql";
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
@Resolver(() => TSessionUserDate)
export class TSessionUserDateResolver {

                
    @Query(() => Number)
    async sessionUserDateCount(@Arg("filter", { nullable: true }) filter?: TFilter) {
        const { total } = await useGenericResolverFieldsDataMany({ className: "TSessionUserDate", filter })
        return total
    }    

                
    @Query(() => TSessionUserDatesResponse)
    async sessionUserDates(@Arg("filter", { nullable: true }) filter?: TFilter) {
        return useGenericResolverFieldsDataMany({ className: "TSessionUserDate", filter })
    }    

                
@Query(() => TSessionUserDate)
async sessionUserDate(@Arg("filter", { nullable: true }) filter?: TFilter) {
    return useGenericResolverFieldsDataOne({ className: "TSessionUserDate", filter })
} 

                
@Mutation(() => TSaveOrUpdateResponse)
async saveSessionUserDate(@Arg("data") data: TSaveOrUpdate<TSessionUserDate>) {
    const user = await useContextUser()
    const organisation = await useContextOrganisationActive()
    return useGenericResolverSave({ name: "sessionUserDate", data, user, organisation })
}

                
@Mutation(() => Boolean)
async deleteSessionUserDate(@Arg("data") data: TDelete) {
    return useGenericResolverDelete({ className: "TSessionUserDate", ids: data.ids || [] })
}

                
                
            
}
    
        