import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { FindFirstAgentOrThrowArgs } from "./args/FindFirstAgentOrThrowArgs";
import { Agent } from "../../../models/Agent";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Agent)
export class FindFirstAgentOrThrowResolver {
  @TypeGraphQL.Query(_returns => Agent, {
    nullable: true
  })
  async findFirstAgentOrThrow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstAgentOrThrowArgs): Promise<Agent | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).agent.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
