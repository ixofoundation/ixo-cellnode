import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { FindFirstCapabilityOrThrowArgs } from "./args/FindFirstCapabilityOrThrowArgs";
import { Capability } from "../../../models/Capability";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Capability)
export class FindFirstCapabilityOrThrowResolver {
  @TypeGraphQL.Query(_returns => Capability, {
    nullable: true
  })
  async findFirstCapabilityOrThrow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstCapabilityOrThrowArgs): Promise<Capability | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).capability.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
