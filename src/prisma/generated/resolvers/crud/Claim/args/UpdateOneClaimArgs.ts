import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ClaimUpdateInput } from "../../../inputs/ClaimUpdateInput";
import { ClaimWhereUniqueInput } from "../../../inputs/ClaimWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneClaimArgs {
  @TypeGraphQL.Field(_type => ClaimUpdateInput, {
    nullable: false
  })
  data!: ClaimUpdateInput;

  @TypeGraphQL.Field(_type => ClaimWhereUniqueInput, {
    nullable: false
  })
  where!: ClaimWhereUniqueInput;
}
