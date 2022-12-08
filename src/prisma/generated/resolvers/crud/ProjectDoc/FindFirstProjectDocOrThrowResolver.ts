import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { FindFirstProjectDocOrThrowArgs } from "./args/FindFirstProjectDocOrThrowArgs";
import { ProjectDoc } from "../../../models/ProjectDoc";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ProjectDoc)
export class FindFirstProjectDocOrThrowResolver {
  @TypeGraphQL.Query(_returns => ProjectDoc, {
    nullable: true
  })
  async findFirstProjectDocOrThrow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstProjectDocOrThrowArgs): Promise<ProjectDoc | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).projectDoc.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
