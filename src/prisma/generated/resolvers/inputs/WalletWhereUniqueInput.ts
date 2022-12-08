import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("WalletWhereUniqueInput", {
  isAbstract: true
})
export class WalletWhereUniqueInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  did?: string | undefined;
}
