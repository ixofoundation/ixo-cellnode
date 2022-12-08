import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("PublicScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class PublicScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [PublicScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: PublicScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [PublicScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: PublicScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [PublicScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: PublicScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  key?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  cid?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  extension?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  contentType?: StringWithAggregatesFilter | undefined;
}
