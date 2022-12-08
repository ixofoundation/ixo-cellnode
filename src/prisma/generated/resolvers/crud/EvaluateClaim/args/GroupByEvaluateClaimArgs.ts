import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EvaluateClaimOrderByWithAggregationInput } from "../../../inputs/EvaluateClaimOrderByWithAggregationInput";
import { EvaluateClaimScalarWhereWithAggregatesInput } from "../../../inputs/EvaluateClaimScalarWhereWithAggregatesInput";
import { EvaluateClaimWhereInput } from "../../../inputs/EvaluateClaimWhereInput";
import { EvaluateClaimScalarFieldEnum } from "../../../../enums/EvaluateClaimScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByEvaluateClaimArgs {
  @TypeGraphQL.Field(_type => EvaluateClaimWhereInput, {
    nullable: true
  })
  where?: EvaluateClaimWhereInput | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: EvaluateClaimOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [EvaluateClaimScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "claimId" | "projectDid" | "status" | "txHash" | "creator" | "created" | "version">;

  @TypeGraphQL.Field(_type => EvaluateClaimScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: EvaluateClaimScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
