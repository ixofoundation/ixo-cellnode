import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { AggregateCapabilityArgs } from "./args/AggregateCapabilityArgs";
import { Capability } from "../../../models/Capability";
import { AggregateCapability } from "../../outputs/AggregateCapability";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Capability)
export class AggregateCapabilityResolver {
  @TypeGraphQL.Query(_returns => AggregateCapability, {
    nullable: false
  })
  async aggregateCapability(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateCapabilityArgs): Promise<AggregateCapability> {
    return getPrismaFromContext(ctx).capability.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
