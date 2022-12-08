import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";

@TypeGraphQL.ObjectType("Public", {
  isAbstract: true
})
export class Public {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  key!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  cid!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  extension!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  contentType!: string;
}
