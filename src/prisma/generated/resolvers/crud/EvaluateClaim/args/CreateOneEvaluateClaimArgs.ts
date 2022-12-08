import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EvaluateClaimCreateInput } from "../../../inputs/EvaluateClaimCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneEvaluateClaimArgs {
  @TypeGraphQL.Field(_type => EvaluateClaimCreateInput, {
    nullable: false
  })
  data!: EvaluateClaimCreateInput;
}
