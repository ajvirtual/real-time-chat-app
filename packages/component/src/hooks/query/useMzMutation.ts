import { MutationFunction, useMutation, UseMutationOptions } from "react-query"
import { useMonitorQuery } from "./useMonitorQuery"
import { QueryMonitorType } from "./useMzQuery"

export const useMzMutation = <TData=any, TVariables=Record<string, any>, TError = any>(
    fn: MutationFunction<TData, TVariables>, 
    config?: UseMzMutationOptions<TData, TVariables, TError>) => {

    const mutation = useMutation(fn, config)

    useMonitorQuery(mutation, config)

    return mutation
}

export type UseMzMutationOptions<TData = unknown, TVariables = any, TError = any, TContext = unknown> = 
    UseMutationOptions<TData, TError, TVariables, TContext>
    & QueryMonitorType<TError, TData>
