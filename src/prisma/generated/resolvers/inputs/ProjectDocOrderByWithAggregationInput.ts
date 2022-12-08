import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProjectDocCountOrderByAggregateInput } from "../inputs/ProjectDocCountOrderByAggregateInput";
import { ProjectDocMaxOrderByAggregateInput } from "../inputs/ProjectDocMaxOrderByAggregateInput";
import { ProjectDocMinOrderByAggregateInput } from "../inputs/ProjectDocMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("ProjectDocOrderByWithAggregationInput", {
  isAbstract: true
})
export class ProjectDocOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  projectDid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  projectDoc?: "asc" | "desc" | undefined;

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

  @TypeGraphQL.Field(_type => ProjectDocCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: ProjectDocCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ProjectDocMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: ProjectDocMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ProjectDocMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: ProjectDocMinOrderByAggregateInput | undefined;
}
