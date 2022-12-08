import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("ClaimWhereUniqueInput", {
  isAbstract: true
})
export class ClaimWhereUniqueInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  txHash?: string | undefined;
}
