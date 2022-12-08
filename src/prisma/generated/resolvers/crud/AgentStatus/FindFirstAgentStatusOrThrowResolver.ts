import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { FindFirstAgentStatusOrThrowArgs } from "./args/FindFirstAgentStatusOrThrowArgs";
import { AgentStatus } from "../../../models/AgentStatus";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => AgentStatus)
export class FindFirstAgentStatusOrThrowResolver {
  @TypeGraphQL.Query(_returns => AgentStatus, {
    nullable: true
  })
  async findFirstAgentStatusOrThrow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstAgentStatusOrThrowArgs): Promise<AgentStatus | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).agentStatus.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
