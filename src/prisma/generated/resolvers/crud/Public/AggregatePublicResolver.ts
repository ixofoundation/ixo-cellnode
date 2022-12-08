import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { AggregatePublicArgs } from "./args/AggregatePublicArgs";
import { Public } from "../../../models/Public";
import { AggregatePublic } from "../../outputs/AggregatePublic";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Public)
export class AggregatePublicResolver {
  @TypeGraphQL.Query(_returns => AggregatePublic, {
    nullable: false
  })
  async aggregatePublic(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregatePublicArgs): Promise<AggregatePublic> {
    return getPrismaFromContext(ctx).public.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
