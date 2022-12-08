import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("WalletWhereInput", {
  isAbstract: true
})
export class WalletWhereInput {
  @TypeGraphQL.Field(_type => [WalletWhereInput], {
    nullable: true
  })
  AND?: WalletWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [WalletWhereInput], {
    nullable: true
  })
  OR?: WalletWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [WalletWhereInput], {
    nullable: true
  })
  NOT?: WalletWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  did?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  signKey?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  verifyKey?: StringFilter | undefined;
}
