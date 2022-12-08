import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PublicCreateInput } from "../../../inputs/PublicCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOnePublicArgs {
  @TypeGraphQL.Field(_type => PublicCreateInput, {
    nullable: false
  })
  data!: PublicCreateInput;
}
