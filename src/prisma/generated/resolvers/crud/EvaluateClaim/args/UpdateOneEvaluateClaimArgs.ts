import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EvaluateClaimUpdateInput } from "../../../inputs/EvaluateClaimUpdateInput";
import { EvaluateClaimWhereUniqueInput } from "../../../inputs/EvaluateClaimWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneEvaluateClaimArgs {
  @TypeGraphQL.Field(_type => EvaluateClaimUpdateInput, {
    nullable: false
  })
  data!: EvaluateClaimUpdateInput;

  @TypeGraphQL.Field(_type => EvaluateClaimWhereUniqueInput, {
    nullable: false
  })
  where!: EvaluateClaimWhereUniqueInput;
}
