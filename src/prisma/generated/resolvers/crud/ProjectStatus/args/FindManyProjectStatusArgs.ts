import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectStatusOrderByWithRelationInput } from "../../../inputs/ProjectStatusOrderByWithRelationInput";
import { ProjectStatusWhereInput } from "../../../inputs/ProjectStatusWhereInput";
import { ProjectStatusWhereUniqueInput } from "../../../inputs/ProjectStatusWhereUniqueInput";
import { ProjectStatusScalarFieldEnum } from "../../../../enums/ProjectStatusScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindManyProjectStatusArgs {
  @TypeGraphQL.Field(_type => ProjectStatusWhereInput, {
    nullable: true
  })
  where?: ProjectStatusWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ProjectStatusOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: ProjectStatusOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => ProjectStatusWhereUniqueInput, {
    nullable: true
  })
  cursor?: ProjectStatusWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [ProjectStatusScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "projectDid" | "status" | "txHash" | "creator" | "created"> | undefined;
}
