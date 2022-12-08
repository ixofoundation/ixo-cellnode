import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("PublicMinAggregate", {
  isAbstract: true
})
export class PublicMinAggregate {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  key!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  cid!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  extension!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  contentType!: string | null;
}
