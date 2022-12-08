import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EvaluateClaimOrderByWithRelationInput } from "../../../inputs/EvaluateClaimOrderByWithRelationInput";
import { EvaluateClaimWhereInput } from "../../../inputs/EvaluateClaimWhereInput";
import { EvaluateClaimWhereUniqueInput } from "../../../inputs/EvaluateClaimWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateEvaluateClaimArgs {
  @TypeGraphQL.Field(_type => EvaluateClaimWhereInput, {
    nullable: true
  })
  where?: EvaluateClaimWhereInput | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: EvaluateClaimOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => EvaluateClaimWhereUniqueInput, {
    nullable: true
  })
  cursor?: EvaluateClaimWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
