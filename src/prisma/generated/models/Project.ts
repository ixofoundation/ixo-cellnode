import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";

@TypeGraphQL.ObjectType("Project", {
  isAbstract: true
})
export class Project {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  projectDid!: string;

  @TypeGraphQL.Field(_type => GraphQLScalars.JSONResolver, {
    nullable: true
  })
  projectData?: Prisma.JsonValue | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  txHash!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  creator!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  created!: string;
}