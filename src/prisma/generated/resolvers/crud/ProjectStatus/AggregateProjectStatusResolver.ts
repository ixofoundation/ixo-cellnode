import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { AggregateProjectStatusArgs } from "./args/AggregateProjectStatusArgs";
import { ProjectStatus } from "../../../models/ProjectStatus";
import { AggregateProjectStatus } from "../../outputs/AggregateProjectStatus";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => ProjectStatus)
export class AggregateProjectStatusResolver {
  @TypeGraphQL.Query(_returns => AggregateProjectStatus, {
    nullable: false
  })
  async aggregateProjectStatus(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateProjectStatusArgs): Promise<AggregateProjectStatus> {
    return getPrismaFromContext(ctx).projectStatus.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
