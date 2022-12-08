import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ClaimCreateInput } from "../../../inputs/ClaimCreateInput";
import { ClaimUpdateInput } from "../../../inputs/ClaimUpdateInput";
import { ClaimWhereUniqueInput } from "../../../inputs/ClaimWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneClaimArgs {
  @TypeGraphQL.Field(_type => ClaimWhereUniqueInput, {
    nullable: false
  })
  where!: ClaimWhereUniqueInput;

  @TypeGraphQL.Field(_type => ClaimCreateInput, {
    nullable: false
  })
  create!: ClaimCreateInput;

  @TypeGraphQL.Field(_type => ClaimUpdateInput, {
    nullable: false
  })
  update!: ClaimUpdateInput;
}
