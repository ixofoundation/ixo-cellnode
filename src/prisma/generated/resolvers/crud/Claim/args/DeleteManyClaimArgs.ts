import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ClaimWhereInput } from "../../../inputs/ClaimWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyClaimArgs {
  @TypeGraphQL.Field(_type => ClaimWhereInput, {
    nullable: true
  })
  where?: ClaimWhereInput | undefined;
}
