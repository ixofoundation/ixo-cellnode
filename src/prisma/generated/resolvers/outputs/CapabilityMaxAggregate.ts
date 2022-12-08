import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("CapabilityMaxAggregate", {
  isAbstract: true
})
export class CapabilityMaxAggregate {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  id!: number | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  projectDid!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  capability!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  template!: string | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  validateKYC!: boolean | null;
}
