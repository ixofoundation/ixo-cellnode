import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PublicCountOrderByAggregateInput } from "../inputs/PublicCountOrderByAggregateInput";
import { PublicMaxOrderByAggregateInput } from "../inputs/PublicMaxOrderByAggregateInput";
import { PublicMinOrderByAggregateInput } from "../inputs/PublicMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("PublicOrderByWithAggregationInput", {
  isAbstract: true
})
export class PublicOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  key?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  cid?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  extension?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  contentType?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => PublicCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: PublicCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => PublicMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: PublicMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => PublicMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: PublicMinOrderByAggregateInput | undefined;
}
