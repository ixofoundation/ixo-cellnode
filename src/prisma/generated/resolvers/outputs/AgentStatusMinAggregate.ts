import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("AgentStatusMinAggregate", {
  isAbstract: true
})
export class AgentStatusMinAggregate {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  id!: number | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  agentDid!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  projectDid!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  status!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  role!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  version!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  txHash!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  creator!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  created!: string | null;
}