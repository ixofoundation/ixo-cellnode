import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ClaimCountOrderByAggregateInput } from "../inputs/ClaimCountOrderByAggregateInput";
import { ClaimMaxOrderByAggregateInput } from "../inputs/ClaimMaxOrderByAggregateInput";
import { ClaimMinOrderByAggregateInput } from "../inputs/ClaimMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("ClaimOrderByWithAggregationInput", {
  isAbstract: true
})
export class ClaimOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  txHash?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  claimTemplateId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  projectDid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  context?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  type?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  issuerId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  claimSubjectId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  items?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  dateTime?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  creator?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  created?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => ClaimCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: ClaimCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ClaimMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: ClaimMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ClaimMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: ClaimMinOrderByAggregateInput | undefined;
}
