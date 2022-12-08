import * as TypeGraphQL from "type-graphql";
import { Agent } from "../../../models/Agent";
import { AgentStatus } from "../../../models/AgentStatus";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => AgentStatus)
export class AgentStatusRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Agent, {
    nullable: false
  })
  async agent(@TypeGraphQL.Root() agentStatus: AgentStatus, @TypeGraphQL.Ctx() ctx: any): Promise<Agent> {
    return getPrismaFromContext(ctx).agentStatus.findUnique({
      where: {
        id: agentStatus.id,
      },
    }).agent({});
  }
}
