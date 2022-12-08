import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { WalletCountOrderByAggregateInput } from "../inputs/WalletCountOrderByAggregateInput";
import { WalletMaxOrderByAggregateInput } from "../inputs/WalletMaxOrderByAggregateInput";
import { WalletMinOrderByAggregateInput } from "../inputs/WalletMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("WalletOrderByWithAggregationInput", {
  isAbstract: true
})
export class WalletOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  did?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  signKey?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  verifyKey?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => WalletCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: WalletCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => WalletMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: WalletMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => WalletMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: WalletMinOrderByAggregateInput | undefined;
}
