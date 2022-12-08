import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("ProjectWhereUniqueInput", {
  isAbstract: true
})
export class ProjectWhereUniqueInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  projectDid?: string | undefined;
}
