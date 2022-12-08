import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("ProjectDocWhereUniqueInput", {
  isAbstract: true
})
export class ProjectDocWhereUniqueInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  projectDid?: string | undefined;
}
