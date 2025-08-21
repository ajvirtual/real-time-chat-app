import { Field, InputType } from "type-graphql"

@InputType()
export class TDelete {
    @Field(() => [Number], { nullable: true })
    ids?: Array<number>
}