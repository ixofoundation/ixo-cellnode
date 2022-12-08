import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { JsonNullableFilter } from "../inputs/JsonNullableFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("ProjectWhereInput", {
  isAbstract: true
})
export class ProjectWhereInput {
  @TypeGraphQL.Field(_type => [ProjectWhereInput], {
    nullable: true
  })
  AND?: ProjectWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectWhereInput], {
    nullable: true
  })
  OR?: ProjectWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectWhereInput], {
    nullable: true
  })
  NOT?: ProjectWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  projectDid?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => JsonNullableFilter, {
    nullable: true
  })
  projectData?: JsonNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  txHash?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  creator?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  created?: StringFilter | undefined;
}
