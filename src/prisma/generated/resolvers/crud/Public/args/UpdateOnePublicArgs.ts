import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PublicUpdateInput } from "../../../inputs/PublicUpdateInput";
import { PublicWhereUniqueInput } from "../../../inputs/PublicWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOnePublicArgs {
  @TypeGraphQL.Field(_type => PublicUpdateInput, {
    nullable: false
  })
  data!: PublicUpdateInput;

  @TypeGraphQL.Field(_type => PublicWhereUniqueInput, {
    nullable: false
  })
  where!: PublicWhereUniqueInput;
}
