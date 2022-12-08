import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("PublicWhereInput", {
  isAbstract: true
})
export class PublicWhereInput {
  @TypeGraphQL.Field(_type => [PublicWhereInput], {
    nullable: true
  })
  AND?: PublicWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [PublicWhereInput], {
    nullable: true
  })
  OR?: PublicWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [PublicWhereInput], {
    nullable: true
  })
  NOT?: PublicWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  key?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  cid?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  extension?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  contentType?: StringFilter | undefined;
}
