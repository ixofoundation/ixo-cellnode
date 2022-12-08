import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectStatusOrderByWithAggregationInput } from "../../../inputs/ProjectStatusOrderByWithAggregationInput";
import { ProjectStatusScalarWhereWithAggregatesInput } from "../../../inputs/ProjectStatusScalarWhereWithAggregatesInput";
import { ProjectStatusWhereInput } from "../../../inputs/ProjectStatusWhereInput";
import { ProjectStatusScalarFieldEnum } from "../../../../enums/ProjectStatusScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByProjectStatusArgs {
  @TypeGraphQL.Field(_type => ProjectStatusWhereInput, {
    nullable: true
  })
  where?: ProjectStatusWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ProjectStatusOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: ProjectStatusOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectStatusScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "projectDid" | "status" | "txHash" | "creator" | "created">;

  @TypeGraphQL.Field(_type => ProjectStatusScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: ProjectStatusScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
