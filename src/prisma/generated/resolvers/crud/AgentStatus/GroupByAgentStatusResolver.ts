import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { GroupByAgentStatusArgs } from "./args/GroupByAgentStatusArgs";
import { AgentStatus } from "../../../models/AgentStatus";
import { AgentStatusGroupBy } from "../../outputs/AgentStatusGroupBy";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => AgentStatus)
export class GroupByAgentStatusResolver {
  @TypeGraphQL.Query(_returns => [AgentStatusGroupBy], {
    nullable: false
  })
  async groupByAgentStatus(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByAgentStatusArgs): Promise<AgentStatusGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).agentStatus.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}
