import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EvaluateClaimWhereInput } from "../../../inputs/EvaluateClaimWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyEvaluateClaimArgs {
  @TypeGraphQL.Field(_type => EvaluateClaimWhereInput, {
    nullable: true
  })
  where?: EvaluateClaimWhereInput | undefined;
}
