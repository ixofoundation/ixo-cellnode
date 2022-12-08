import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { UpdateOneAgentStatusArgs } from "./args/UpdateOneAgentStatusArgs";
import { AgentStatus } from "../../../models/AgentStatus";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => AgentStatus)
export class UpdateOneAgentStatusResolver {
  @TypeGraphQL.Mutation(_returns => AgentStatus, {
    nullable: true
  })
  async updateOneAgentStatus(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateOneAgentStatusArgs): Promise<AgentStatus | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).agentStatus.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
