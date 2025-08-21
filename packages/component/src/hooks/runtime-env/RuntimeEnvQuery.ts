import { GraphQLQueryClass } from "@hooks/query/useGraphqlQuery";
import { TSessionUser } from '@chat/graphql'

export class RuntimeEnvQuery implements GraphQLQueryClass<TSessionUser> {
    public queryKey: string = 'App.RuntimeEnvQuery'

    public gql: string = `
        query {
            runtimeEnv {
              authenticated
              user {
                id fullName email firstName lastName
                groups { 
                    id 
                    designation 
                    organisation {
                        id
                        designation
                    }
                }
                profilePicture { id }
              }
            } 
        }
    `

    mapFn = (data: TResponse): TSessionUser => {
        return data.runtimeEnv
    }
}

type TResponse = {
    runtimeEnv: TSessionUser
}
