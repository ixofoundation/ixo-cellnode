import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentStatusAvgOrderByAggregateInput } from "../inputs/AgentStatusAvgOrderByAggregateInput";
import { AgentStatusCountOrderByAggregateInput } from "../inputs/AgentStatusCountOrderByAggregateInput";
import { AgentStatusMaxOrderByAggregateInput } from "../inputs/AgentStatusMaxOrderByAggregateInput";
import { AgentStatusMinOrderByAggregateInput } from "../inputs/AgentStatusMinOrderByAggregateInput";
import { AgentStatusSumOrderByAggregateInput } from "../inputs/AgentStatusSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("AgentStatusOrderByWithAggregationInput", {
  isAbstract: true
})
export class AgentStatusOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

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
  status?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  role?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  version?: "asc" | "desc" | undefined;

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

  @TypeGraphQL.Field(_type => AgentStatusCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: AgentStatusCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => AgentStatusAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: AgentStatusAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => AgentStatusMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: AgentStatusMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => AgentStatusMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: AgentStatusMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => AgentStatusSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: AgentStatusSumOrderByAggregateInput | undefined;
}
