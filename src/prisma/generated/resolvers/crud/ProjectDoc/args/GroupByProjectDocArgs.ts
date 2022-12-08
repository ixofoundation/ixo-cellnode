import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectDocOrderByWithAggregationInput } from "../../../inputs/ProjectDocOrderByWithAggregationInput";
import { ProjectDocScalarWhereWithAggregatesInput } from "../../../inputs/ProjectDocScalarWhereWithAggregatesInput";
import { ProjectDocWhereInput } from "../../../inputs/ProjectDocWhereInput";
import { ProjectDocScalarFieldEnum } from "../../../../enums/ProjectDocScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByProjectDocArgs {
  @TypeGraphQL.Field(_type => ProjectDocWhereInput, {
    nullable: true
  })
  where?: ProjectDocWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ProjectDocOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: ProjectDocOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectDocScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"projectDid" | "projectDoc" | "txHash" | "creator" | "created">;

  @TypeGraphQL.Field(_type => ProjectDocScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: ProjectDocScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
