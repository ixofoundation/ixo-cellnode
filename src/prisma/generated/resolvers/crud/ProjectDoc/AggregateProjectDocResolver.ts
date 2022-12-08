import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { AggregateProjectDocArgs } from "./args/AggregateProjectDocArgs";
import { ProjectDoc } from "../../../models/ProjectDoc";
import { AggregateProjectDoc } from "../../outputs/AggregateProjectDoc";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ProjectDoc)
export class AggregateProjectDocResolver {
  @TypeGraphQL.Query(_returns => AggregateProjectDoc, {
    nullable: false
  })
  async aggregateProjectDoc(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateProjectDocArgs): Promise<AggregateProjectDoc> {
    return getPrismaFromContext(ctx).projectDoc.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
