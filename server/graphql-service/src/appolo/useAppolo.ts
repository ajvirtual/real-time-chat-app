import { buildSchema } from 'type-graphql';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { Resolvers } from '../resolver';
import { TAppContext } from '@chat/graphql';
import { useDecryptQuery } from '../hooks/encryption/useDecryptQuery';
import { ENV } from '@chat/context';

export const appolo_schema = () => {
    return buildSchema({
        resolvers: Resolvers as any,
    })
}

export const useAppolo = async () => {
    return new ApolloServer({
        schema: await appolo_schema(),
        context: ({ req }: ExpressContext): TAppContext => req.app.get('context'),
        plugins: [
            {
              requestDidStart(requestContext: any) {

                const secret_key = ENV.REACT_APP_GRAPHQL_SECRET_KEY || ""
                if(!secret_key) return;
                requestContext.request.query = useDecryptQuery(requestContext.request.query || "", secret_key);

              },
            },
        ]
    });
}
