import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { JsonNullableFilter } from "../inputs/JsonNullableFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("ProjectDocWhereInput", {
  isAbstract: true
})
export class ProjectDocWhereInput {
  @TypeGraphQL.Field(_type => [ProjectDocWhereInput], {
    nullable: true
  })
  AND?: ProjectDocWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectDocWhereInput], {
    nullable: true
  })
  OR?: ProjectDocWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectDocWhereInput], {
    nullable: true
  })
  NOT?: ProjectDocWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  projectDid?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => JsonNullableFilter, {
    nullable: true
  })
  projectDoc?: JsonNullableFilter | undefined;

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
