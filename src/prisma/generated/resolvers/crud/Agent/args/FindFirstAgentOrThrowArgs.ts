import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { AgentOrderByWithRelationInput } from "../../../inputs/AgentOrderByWithRelationInput";
import { AgentWhereInput } from "../../../inputs/AgentWhereInput";
import { AgentWhereUniqueInput } from "../../../inputs/AgentWhereUniqueInput";
import { AgentScalarFieldEnum } from "../../../../enums/AgentScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstAgentOrThrowArgs {
  @TypeGraphQL.Field(_type => AgentWhereInput, {
    nullable: true
  })
  where?: AgentWhereInput | undefined;

  @TypeGraphQL.Field(_type => [AgentOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: AgentOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => AgentWhereUniqueInput, {
    nullable: true
  })
  cursor?: AgentWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [AgentScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"agentDid" | "projectDid" | "email" | "name" | "role" | "txHash" | "creator" | "created"> | undefined;
}
