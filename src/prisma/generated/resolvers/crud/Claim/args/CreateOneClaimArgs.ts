import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ClaimCreateInput } from "../../../inputs/ClaimCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneClaimArgs {
  @TypeGraphQL.Field(_type => ClaimCreateInput, {
    nullable: false
  })
  data!: ClaimCreateInput;
}
