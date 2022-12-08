import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { AggregateAgentStatusArgs } from "./args/AggregateAgentStatusArgs";
import { AgentStatus } from "../../../models/AgentStatus";
import { AggregateAgentStatus } from "../../outputs/AggregateAgentStatus";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => AgentStatus)
export class AggregateAgentStatusResolver {
  @TypeGraphQL.Query(_returns => AggregateAgentStatus, {
    nullable: false
  })
  async aggregateAgentStatus(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateAgentStatusArgs): Promise<AggregateAgentStatus> {
    return getPrismaFromContext(ctx).agentStatus.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
