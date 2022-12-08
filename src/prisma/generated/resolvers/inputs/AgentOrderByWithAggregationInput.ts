import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentCountOrderByAggregateInput } from "../inputs/AgentCountOrderByAggregateInput";
import { AgentMaxOrderByAggregateInput } from "../inputs/AgentMaxOrderByAggregateInput";
import { AgentMinOrderByAggregateInput } from "../inputs/AgentMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("AgentOrderByWithAggregationInput", {
  isAbstract: true
})
export class AgentOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  agentDid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  projectDid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  email?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  role?: "asc" | "desc" | undefined;

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

  @TypeGraphQL.Field(_type => AgentCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: AgentCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => AgentMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: AgentMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => AgentMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: AgentMinOrderByAggregateInput | undefined;
}
