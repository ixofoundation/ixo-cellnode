import * as TypeGraphQL from "type-graphql";
import { Agent } from "../../../models/Agent";
import { AgentStatus } from "../../../models/AgentStatus";
import { AgentAgentStatusArgs } from "./args/AgentAgentStatusArgs";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Agent)
export class AgentRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [AgentStatus], {
    nullable: false
  })
  async AgentStatus(@TypeGraphQL.Root() agent: Agent, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: AgentAgentStatusArgs): Promise<AgentStatus[]> {
    return getPrismaFromContext(ctx).agent.findUnique({
      where: {
        agentDid: agent.agentDid,
      },
    }).AgentStatus(args);
  }
}
