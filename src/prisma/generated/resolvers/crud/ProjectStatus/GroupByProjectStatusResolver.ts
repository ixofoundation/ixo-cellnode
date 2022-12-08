import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { GroupByProjectStatusArgs } from "./args/GroupByProjectStatusArgs";
import { ProjectStatus } from "../../../models/ProjectStatus";
import { ProjectStatusGroupBy } from "../../outputs/ProjectStatusGroupBy";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ProjectStatus)
export class GroupByProjectStatusResolver {
  @TypeGraphQL.Query(_returns => [ProjectStatusGroupBy], {
    nullable: false
  })
  async groupByProjectStatus(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByProjectStatusArgs): Promise<ProjectStatusGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).projectStatus.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}
