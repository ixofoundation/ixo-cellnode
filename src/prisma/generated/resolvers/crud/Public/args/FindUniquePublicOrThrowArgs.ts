import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PublicWhereUniqueInput } from "../../../inputs/PublicWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniquePublicOrThrowArgs {
  @TypeGraphQL.Field(_type => PublicWhereUniqueInput, {
    nullable: false
  })
  where!: PublicWhereUniqueInput;
}
