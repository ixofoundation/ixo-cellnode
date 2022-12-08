import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { UpdateOneProjectDocArgs } from "./args/UpdateOneProjectDocArgs";
import { ProjectDoc } from "../../../models/ProjectDoc";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ProjectDoc)
export class UpdateOneProjectDocResolver {
  @TypeGraphQL.Mutation(_returns => ProjectDoc, {
    nullable: true
  })
  async updateOneProjectDoc(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateOneProjectDocArgs): Promise<ProjectDoc | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).projectDoc.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
