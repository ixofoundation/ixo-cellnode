import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { JsonNullableWithAggregatesFilter } from "../inputs/JsonNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("ProjectDocScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class ProjectDocScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [ProjectDocScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: ProjectDocScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectDocScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: ProjectDocScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectDocScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: ProjectDocScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  projectDid?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => JsonNullableWithAggregatesFilter, {
    nullable: true
  })
  projectDoc?: JsonNullableWithAggregatesFilter | undefined;

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
