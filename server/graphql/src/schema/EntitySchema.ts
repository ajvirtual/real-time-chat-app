import { Field, InputType } from "type-graphql";
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class EntityInput {
    @Field({ nullable: true })
    id?: number

    @Field(() => GraphQLJSONObject)
    data?: Record<string, any>
}

@InputType()
export class EntityQuery {
    @Field({ nullable: true })
    id?: number

    @Field(() => GraphQLJSONObject)
    data?: Record<string, any>
}
