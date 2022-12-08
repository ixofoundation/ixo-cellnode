import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { AggregateAgentArgs } from "./args/AggregateAgentArgs";
import { Agent } from "../../../models/Agent";
import { AggregateAgent } from "../../outputs/AggregateAgent";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Agent)
export class AggregateAgentResolver {
  @TypeGraphQL.Query(_returns => AggregateAgent, {
    nullable: false
  })
  async aggregateAgent(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateAgentArgs): Promise<AggregateAgent> {
    return getPrismaFromContext(ctx).agent.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
