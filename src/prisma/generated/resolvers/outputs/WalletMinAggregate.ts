import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("WalletMinAggregate", {
  isAbstract: true
})
export class WalletMinAggregate {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  did!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  signKey!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  verifyKey!: string | null;
}
