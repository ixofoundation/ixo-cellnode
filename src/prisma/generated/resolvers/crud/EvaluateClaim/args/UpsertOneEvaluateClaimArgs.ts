import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EvaluateClaimCreateInput } from "../../../inputs/EvaluateClaimCreateInput";
import { EvaluateClaimUpdateInput } from "../../../inputs/EvaluateClaimUpdateInput";
import { EvaluateClaimWhereUniqueInput } from "../../../inputs/EvaluateClaimWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneEvaluateClaimArgs {
  @TypeGraphQL.Field(_type => EvaluateClaimWhereUniqueInput, {
    nullable: false
  })
  where!: EvaluateClaimWhereUniqueInput;

  @TypeGraphQL.Field(_type => EvaluateClaimCreateInput, {
    nullable: false
  })
  create!: EvaluateClaimCreateInput;

  @TypeGraphQL.Field(_type => EvaluateClaimUpdateInput, {
    nullable: false
  })
  update!: EvaluateClaimUpdateInput;
}
