import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { FindUniqueProjectDocArgs } from "./args/FindUniqueProjectDocArgs";
import { ProjectDoc } from "../../../models/ProjectDoc";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ProjectDoc)
export class FindUniqueProjectDocResolver {
  @TypeGraphQL.Query(_returns => ProjectDoc, {
    nullable: true
  })
  async projectDoc(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueProjectDocArgs): Promise<ProjectDoc | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).projectDoc.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
