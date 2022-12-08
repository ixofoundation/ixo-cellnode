import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectStatusAvgOrderByAggregateInput } from "../inputs/ProjectStatusAvgOrderByAggregateInput";
import { ProjectStatusCountOrderByAggregateInput } from "../inputs/ProjectStatusCountOrderByAggregateInput";
import { ProjectStatusMaxOrderByAggregateInput } from "../inputs/ProjectStatusMaxOrderByAggregateInput";
import { ProjectStatusMinOrderByAggregateInput } from "../inputs/ProjectStatusMinOrderByAggregateInput";
import { ProjectStatusSumOrderByAggregateInput } from "../inputs/ProjectStatusSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("ProjectStatusOrderByWithAggregationInput", {
  isAbstract: true
})
export class ProjectStatusOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

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

  @TypeGraphQL.Field(_type => ProjectStatusCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: ProjectStatusCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ProjectStatusAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: ProjectStatusAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ProjectStatusMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: ProjectStatusMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ProjectStatusMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: ProjectStatusMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ProjectStatusSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: ProjectStatusSumOrderByAggregateInput | undefined;
}
