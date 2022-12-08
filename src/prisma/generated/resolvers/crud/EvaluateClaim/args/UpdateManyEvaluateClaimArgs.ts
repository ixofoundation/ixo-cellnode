import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EvaluateClaimUpdateManyMutationInput } from "../../../inputs/EvaluateClaimUpdateManyMutationInput";
import { EvaluateClaimWhereInput } from "../../../inputs/EvaluateClaimWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyEvaluateClaimArgs {
  @TypeGraphQL.Field(_type => EvaluateClaimUpdateManyMutationInput, {
    nullable: false
  })
  data!: EvaluateClaimUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => EvaluateClaimWhereInput, {
    nullable: true
  })
  where?: EvaluateClaimWhereInput | undefined;
}
