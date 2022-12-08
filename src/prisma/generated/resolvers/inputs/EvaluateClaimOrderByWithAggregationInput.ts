import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EvaluateClaimAvgOrderByAggregateInput } from "../inputs/EvaluateClaimAvgOrderByAggregateInput";
import { EvaluateClaimCountOrderByAggregateInput } from "../inputs/EvaluateClaimCountOrderByAggregateInput";
import { EvaluateClaimMaxOrderByAggregateInput } from "../inputs/EvaluateClaimMaxOrderByAggregateInput";
import { EvaluateClaimMinOrderByAggregateInput } from "../inputs/EvaluateClaimMinOrderByAggregateInput";
import { EvaluateClaimSumOrderByAggregateInput } from "../inputs/EvaluateClaimSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("EvaluateClaimOrderByWithAggregationInput", {
  isAbstract: true
})
export class EvaluateClaimOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  claimId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  projectDid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  status?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  txHash?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  creator?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  created?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  version?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => EvaluateClaimCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: EvaluateClaimCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => EvaluateClaimAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: EvaluateClaimAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => EvaluateClaimMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: EvaluateClaimMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => EvaluateClaimMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: EvaluateClaimMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => EvaluateClaimSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: EvaluateClaimSumOrderByAggregateInput | undefined;
}
