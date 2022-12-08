import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";

@TypeGraphQL.ObjectType("Capability", {
  isAbstract: true
})
export class Capability {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  projectDid!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  capability!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  template!: string;

  @TypeGraphQL.Field(_type => [String], {
    nullable: false
  })
  allow!: string[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  validateKYC?: boolean | null;
}
