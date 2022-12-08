import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { FindFirstProjectStatusArgs } from "./args/FindFirstProjectStatusArgs";
import { ProjectStatus } from "../../../models/ProjectStatus";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ProjectStatus)
export class FindFirstProjectStatusResolver {
  @TypeGraphQL.Query(_returns => ProjectStatus, {
    nullable: true
  })
  async findFirstProjectStatus(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstProjectStatusArgs): Promise<ProjectStatus | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).projectStatus.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
