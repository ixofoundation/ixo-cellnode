import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentOrderByWithAggregationInput } from "../../../inputs/AgentOrderByWithAggregationInput";
import { AgentScalarWhereWithAggregatesInput } from "../../../inputs/AgentScalarWhereWithAggregatesInput";
import { AgentWhereInput } from "../../../inputs/AgentWhereInput";
import { AgentScalarFieldEnum } from "../../../../enums/AgentScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByAgentArgs {
  @TypeGraphQL.Field(_type => AgentWhereInput, {
    nullable: true
  })
  where?: AgentWhereInput | undefined;

  @TypeGraphQL.Field(_type => [AgentOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: AgentOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [AgentScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"agentDid" | "projectDid" | "email" | "name" | "role" | "txHash" | "creator" | "created">;

  @TypeGraphQL.Field(_type => AgentScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: AgentScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
