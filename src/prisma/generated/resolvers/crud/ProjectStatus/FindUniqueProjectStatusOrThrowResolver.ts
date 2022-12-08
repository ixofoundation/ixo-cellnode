import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { FindUniqueProjectStatusOrThrowArgs } from "./args/FindUniqueProjectStatusOrThrowArgs";
import { ProjectStatus } from "../../../models/ProjectStatus";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ProjectStatus)
export class FindUniqueProjectStatusOrThrowResolver {
  @TypeGraphQL.Query(_returns => ProjectStatus, {
    nullable: true
  })
  async getProjectStatus(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueProjectStatusOrThrowArgs): Promise<ProjectStatus | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).projectStatus.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
