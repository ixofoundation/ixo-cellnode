import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { GroupByPublicArgs } from "./args/GroupByPublicArgs";
import { Public } from "../../../models/Public";
import { PublicGroupBy } from "../../outputs/PublicGroupBy";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Public)
export class GroupByPublicResolver {
  @TypeGraphQL.Query(_returns => [PublicGroupBy], {
    nullable: false
  })
  async groupByPublic(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByPublicArgs): Promise<PublicGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).public.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}
