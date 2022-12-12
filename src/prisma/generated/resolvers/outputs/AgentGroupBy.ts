import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AgentCountAggregate } from "../outputs/AgentCountAggregate";
import { AgentMaxAggregate } from "../outputs/AgentMaxAggregate";
import { AgentMinAggregate } from "../outputs/AgentMinAggregate";

@TypeGraphQL.ObjectType("AgentGroupBy", {
  isAbstract: true
})
export class AgentGroupBy {
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

  @TypeGraphQL.Field(_type => AgentCountAggregate, {
    nullable: true
  })
  _count!: AgentCountAggregate | null;

  @TypeGraphQL.Field(_type => AgentMinAggregate, {
    nullable: true
  })
  _min!: AgentMinAggregate | null;

  @TypeGraphQL.Field(_type => AgentMaxAggregate, {
    nullable: true
  })
  _max!: AgentMaxAggregate | null;
}