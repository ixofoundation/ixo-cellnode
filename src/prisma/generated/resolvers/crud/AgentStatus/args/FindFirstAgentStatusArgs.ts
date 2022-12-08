import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentStatusOrderByWithRelationInput } from "../../../inputs/AgentStatusOrderByWithRelationInput";
import { AgentStatusWhereInput } from "../../../inputs/AgentStatusWhereInput";
import { AgentStatusWhereUniqueInput } from "../../../inputs/AgentStatusWhereUniqueInput";
import { AgentStatusScalarFieldEnum } from "../../../../enums/AgentStatusScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstAgentStatusArgs {
  @TypeGraphQL.Field(_type => AgentStatusWhereInput, {
    nullable: true
  })
  where?: AgentStatusWhereInput | undefined;

  @TypeGraphQL.Field(_type => [AgentStatusOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: AgentStatusOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => AgentStatusWhereUniqueInput, {
    nullable: true
  })
  cursor?: AgentStatusWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [AgentStatusScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "agentDid" | "projectDid" | "status" | "role" | "version" | "txHash" | "creator" | "created"> | undefined;
}
