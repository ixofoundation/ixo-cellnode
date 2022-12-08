import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { GroupByProjectDocArgs } from "./args/GroupByProjectDocArgs";
import { ProjectDoc } from "../../../models/ProjectDoc";
import { ProjectDocGroupBy } from "../../outputs/ProjectDocGroupBy";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ProjectDoc)
export class GroupByProjectDocResolver {
  @TypeGraphQL.Query(_returns => [ProjectDocGroupBy], {
    nullable: false
  })
  async groupByProjectDoc(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByProjectDocArgs): Promise<ProjectDocGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).projectDoc.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}
