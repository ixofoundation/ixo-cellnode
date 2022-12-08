import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectOrderByWithRelationInput } from "../../../inputs/ProjectOrderByWithRelationInput";
import { ProjectWhereInput } from "../../../inputs/ProjectWhereInput";
import { ProjectWhereUniqueInput } from "../../../inputs/ProjectWhereUniqueInput";
import { ProjectScalarFieldEnum } from "../../../../enums/ProjectScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindManyProjectArgs {
  @TypeGraphQL.Field(_type => ProjectWhereInput, {
    nullable: true
  })
  where?: ProjectWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ProjectOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: ProjectOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => ProjectWhereUniqueInput, {
    nullable: true
  })
  cursor?: ProjectWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [ProjectScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"projectDid" | "projectData" | "txHash" | "creator" | "created"> | undefined;
}
