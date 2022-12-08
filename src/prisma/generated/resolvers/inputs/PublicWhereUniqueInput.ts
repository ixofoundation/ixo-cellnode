import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("PublicWhereUniqueInput", {
  isAbstract: true
})
export class PublicWhereUniqueInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  key?: string | undefined;
}
