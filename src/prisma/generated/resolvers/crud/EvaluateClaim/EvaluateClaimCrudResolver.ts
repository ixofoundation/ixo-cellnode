import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { AggregateEvaluateClaimArgs } from "./args/AggregateEvaluateClaimArgs";
import { CreateManyEvaluateClaimArgs } from "./args/CreateManyEvaluateClaimArgs";
import { CreateOneEvaluateClaimArgs } from "./args/CreateOneEvaluateClaimArgs";
import { DeleteManyEvaluateClaimArgs } from "./args/DeleteManyEvaluateClaimArgs";
import { DeleteOneEvaluateClaimArgs } from "./args/DeleteOneEvaluateClaimArgs";
import { FindFirstEvaluateClaimArgs } from "./args/FindFirstEvaluateClaimArgs";
import { FindFirstEvaluateClaimOrThrowArgs } from "./args/FindFirstEvaluateClaimOrThrowArgs";
import { FindManyEvaluateClaimArgs } from "./args/FindManyEvaluateClaimArgs";
import { FindUniqueEvaluateClaimArgs } from "./args/FindUniqueEvaluateClaimArgs";
import { FindUniqueEvaluateClaimOrThrowArgs } from "./args/FindUniqueEvaluateClaimOrThrowArgs";
import { GroupByEvaluateClaimArgs } from "./args/GroupByEvaluateClaimArgs";
import { UpdateManyEvaluateClaimArgs } from "./args/UpdateManyEvaluateClaimArgs";
import { UpdateOneEvaluateClaimArgs } from "./args/UpdateOneEvaluateClaimArgs";
import { UpsertOneEvaluateClaimArgs } from "./args/UpsertOneEvaluateClaimArgs";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";
import { EvaluateClaim } from "../../../models/EvaluateClaim";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateEvaluateClaim } from "../../outputs/AggregateEvaluateClaim";
import { EvaluateClaimGroupBy } from "../../outputs/EvaluateClaimGroupBy";

@TypeGraphQL.Resolver(_of => EvaluateClaim)
export class EvaluateClaimCrudResolver {
  @TypeGraphQL.Query(_returns => AggregateEvaluateClaim, {
    nullable: false
  })
  async aggregateEvaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateEvaluateClaimArgs): Promise<AggregateEvaluateClaim> {
    return getPrismaFromContext(ctx).evaluateClaim.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async createManyEvaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateManyEvaluateClaimArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.createMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => EvaluateClaim, {
    nullable: false
  })
  async createOneEvaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateOneEvaluateClaimArgs): Promise<EvaluateClaim> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyEvaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteManyEvaluateClaimArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => EvaluateClaim, {
    nullable: true
  })
  async deleteOneEvaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteOneEvaluateClaimArgs): Promise<EvaluateClaim | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => EvaluateClaim, {
    nullable: true
  })
  async findFirstEvaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstEvaluateClaimArgs): Promise<EvaluateClaim | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => EvaluateClaim, {
    nullable: true
  })
  async findFirstEvaluateClaimOrThrow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstEvaluateClaimOrThrowArgs): Promise<EvaluateClaim | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => [EvaluateClaim], {
    nullable: false
  })
  async evaluateClaims(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindManyEvaluateClaimArgs): Promise<EvaluateClaim[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => EvaluateClaim, {
    nullable: true
  })
  async evaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueEvaluateClaimArgs): Promise<EvaluateClaim | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => EvaluateClaim, {
    nullable: true
  })
  async getEvaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueEvaluateClaimOrThrowArgs): Promise<EvaluateClaim | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => [EvaluateClaimGroupBy], {
    nullable: false
  })
  async groupByEvaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByEvaluateClaimArgs): Promise<EvaluateClaimGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyEvaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateManyEvaluateClaimArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => EvaluateClaim, {
    nullable: true
  })
  async updateOneEvaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateOneEvaluateClaimArgs): Promise<EvaluateClaim | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => EvaluateClaim, {
    nullable: false
  })
  async upsertOneEvaluateClaim(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertOneEvaluateClaimArgs): Promise<EvaluateClaim> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).evaluateClaim.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
