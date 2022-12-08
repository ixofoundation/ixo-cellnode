import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { CreateOneCapabilityArgs } from "./args/CreateOneCapabilityArgs";
import { Capability } from "../../../models/Capability";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Capability)
export class CreateOneCapabilityResolver {
  @TypeGraphQL.Mutation(_returns => Capability, {
    nullable: false
  })
  async createOneCapability(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateOneCapabilityArgs): Promise<Capability> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).capability.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
