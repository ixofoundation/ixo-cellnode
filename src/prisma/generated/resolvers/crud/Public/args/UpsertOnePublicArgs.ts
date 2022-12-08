import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { PublicCreateInput } from "../../../inputs/PublicCreateInput";
import { PublicUpdateInput } from "../../../inputs/PublicUpdateInput";
import { PublicWhereUniqueInput } from "../../../inputs/PublicWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOnePublicArgs {
  @TypeGraphQL.Field(_type => PublicWhereUniqueInput, {
    nullable: false
  })
  where!: PublicWhereUniqueInput;

  @TypeGraphQL.Field(_type => PublicCreateInput, {
    nullable: false
  })
  create!: PublicCreateInput;

  @TypeGraphQL.Field(_type => PublicUpdateInput, {
    nullable: false
  })
  update!: PublicUpdateInput;
}
