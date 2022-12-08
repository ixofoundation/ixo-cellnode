import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CapabilityAvgOrderByAggregateInput } from "../inputs/CapabilityAvgOrderByAggregateInput";
import { CapabilityCountOrderByAggregateInput } from "../inputs/CapabilityCountOrderByAggregateInput";
import { CapabilityMaxOrderByAggregateInput } from "../inputs/CapabilityMaxOrderByAggregateInput";
import { CapabilityMinOrderByAggregateInput } from "../inputs/CapabilityMinOrderByAggregateInput";
import { CapabilitySumOrderByAggregateInput } from "../inputs/CapabilitySumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("CapabilityOrderByWithAggregationInput", {
  isAbstract: true
})
export class CapabilityOrderByWithAggregationInput {
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
  capability?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  template?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  allow?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  validateKYC?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => CapabilityCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: CapabilityCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => CapabilityAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: CapabilityAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => CapabilityMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: CapabilityMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => CapabilityMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: CapabilityMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => CapabilitySumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: CapabilitySumOrderByAggregateInput | undefined;
}
