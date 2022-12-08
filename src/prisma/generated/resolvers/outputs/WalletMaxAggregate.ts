import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("WalletMaxAggregate", {
  isAbstract: true
})
export class WalletMaxAggregate {
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
