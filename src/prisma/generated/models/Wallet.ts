import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";

@TypeGraphQL.ObjectType("Wallet", {
  isAbstract: true
})
export class Wallet {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  did!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  signKey!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  verifyKey!: string;
}