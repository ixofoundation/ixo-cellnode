import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TransactionAvgOrderByAggregateInput } from "../inputs/TransactionAvgOrderByAggregateInput";
import { TransactionCountOrderByAggregateInput } from "../inputs/TransactionCountOrderByAggregateInput";
import { TransactionMaxOrderByAggregateInput } from "../inputs/TransactionMaxOrderByAggregateInput";
import { TransactionMinOrderByAggregateInput } from "../inputs/TransactionMinOrderByAggregateInput";
import { TransactionSumOrderByAggregateInput } from "../inputs/TransactionSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("TransactionOrderByWithAggregationInput", {
  isAbstract: true
})
export class TransactionOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  hash?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  projectDid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  data?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  nonce?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  signatureType?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  signatureValue?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  timestamp?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  capability?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  blockHeight?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  blockHash?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  blockResponeCode?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  blockError?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => TransactionCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: TransactionCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TransactionAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: TransactionAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TransactionMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: TransactionMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TransactionMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: TransactionMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TransactionSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: TransactionSumOrderByAggregateInput | undefined;
}
