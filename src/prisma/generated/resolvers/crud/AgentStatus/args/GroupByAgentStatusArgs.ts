import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentStatusOrderByWithAggregationInput } from "../../../inputs/AgentStatusOrderByWithAggregationInput";
import { AgentStatusScalarWhereWithAggregatesInput } from "../../../inputs/AgentStatusScalarWhereWithAggregatesInput";
import { AgentStatusWhereInput } from "../../../inputs/AgentStatusWhereInput";
import { AgentStatusScalarFieldEnum } from "../../../../enums/AgentStatusScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByAgentStatusArgs {
  @TypeGraphQL.Field(_type => AgentStatusWhereInput, {
    nullable: true
  })
  where?: AgentStatusWhereInput | undefined;

  @TypeGraphQL.Field(_type => [AgentStatusOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: AgentStatusOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [AgentStatusScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "agentDid" | "projectDid" | "status" | "role" | "version" | "txHash" | "creator" | "created">;

  @TypeGraphQL.Field(_type => AgentStatusScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: AgentStatusScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
