
            
import { Resolver, Query, Arg, Mutation, Ctx, Info, Root, FieldResolver } from "type-graphql";
import { GraphQLResolveInfo } from "graphql/type/definition";
import { 
    TAppContext, 
    TDelete,
    useContextUser,
    useContextOrganisationActive
} from "@chat/graphql";
import { TFile, TFilesResponse } from "@chat/graphql";
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
@Resolver(() => TFile)
export class TFileResolver {

                
    @Query(() => Number)
    async fileCount(@Arg("filter", { nullable: true }) filter?: TFilter) {
        const { total } = await useGenericResolverFieldsDataMany({ className: "TFile", filter })
        return total
    }    

                
    @Query(() => TFilesResponse)
    async files(@Arg("filter", { nullable: true }) filter?: TFilter) {
        return useGenericResolverFieldsDataMany({ className: "TFile", filter })
    }    

                
@Query(() => TFile)
async file(@Arg("filter", { nullable: true }) filter?: TFilter) {
    return useGenericResolverFieldsDataOne({ className: "TFile", filter })
} 

                
@Mutation(() => TSaveOrUpdateResponse)
async saveFile(@Arg("data") data: TSaveOrUpdate<TFile>) {
    const user = await useContextUser()
    const organisation = await useContextOrganisationActive()
    return useGenericResolverSave({ name: "file", data, user, organisation })
}

                
@Mutation(() => Boolean)
async deleteFile(@Arg("data") data: TDelete) {
    return useGenericResolverDelete({ className: "TFile", ids: data.ids || [] })
}

                
                
            
}
    
        