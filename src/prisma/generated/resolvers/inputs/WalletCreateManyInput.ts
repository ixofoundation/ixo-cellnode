import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("WalletCreateManyInput", {
  isAbstract: true
})
export class WalletCreateManyInput {
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
