import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { IntFilter } from "../inputs/IntFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("ProjectStatusWhereInput", {
  isAbstract: true
})
export class ProjectStatusWhereInput {
  @TypeGraphQL.Field(_type => [ProjectStatusWhereInput], {
    nullable: true
  })
  AND?: ProjectStatusWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectStatusWhereInput], {
    nullable: true
  })
  OR?: ProjectStatusWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectStatusWhereInput], {
    nullable: true
  })
  NOT?: ProjectStatusWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  projectDid?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  status?: StringFilter | undefined;

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
