import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { AgentStatus } from "../models/AgentStatus";
import { AgentCount } from "../resolvers/outputs/AgentCount";

@TypeGraphQL.ObjectType("Agent", {
  isAbstract: true
})
export class Agent {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  agentDid!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  projectDid!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  email!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  role!: string;

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

  AgentStatus?: AgentStatus[];

  @TypeGraphQL.Field(_type => AgentCount, {
    nullable: true
  })
  _count?: AgentCount | null;
}
