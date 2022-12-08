import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EvaluateClaimWhereUniqueInput } from "../../../inputs/EvaluateClaimWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueEvaluateClaimArgs {
  @TypeGraphQL.Field(_type => EvaluateClaimWhereUniqueInput, {
    nullable: false
  })
  where!: EvaluateClaimWhereUniqueInput;
}
