import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("WalletScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class WalletScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [WalletScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: WalletScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [WalletScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: WalletScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [WalletScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: WalletScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  did?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  signKey?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  verifyKey?: StringWithAggregatesFilter | undefined;
}
