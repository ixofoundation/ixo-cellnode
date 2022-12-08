import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { JsonNullableWithAggregatesFilter } from "../inputs/JsonNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("ProjectScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class ProjectScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [ProjectScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: ProjectScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: ProjectScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: ProjectScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  projectDid?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => JsonNullableWithAggregatesFilter, {
    nullable: true
  })
  projectData?: JsonNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  txHash?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  creator?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  created?: StringWithAggregatesFilter | undefined;
}
