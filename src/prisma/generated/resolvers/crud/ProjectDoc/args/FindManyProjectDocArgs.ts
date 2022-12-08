import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectDocOrderByWithRelationInput } from "../../../inputs/ProjectDocOrderByWithRelationInput";
import { ProjectDocWhereInput } from "../../../inputs/ProjectDocWhereInput";
import { ProjectDocWhereUniqueInput } from "../../../inputs/ProjectDocWhereUniqueInput";
import { ProjectDocScalarFieldEnum } from "../../../../enums/ProjectDocScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindManyProjectDocArgs {
  @TypeGraphQL.Field(_type => ProjectDocWhereInput, {
    nullable: true
  })
  where?: ProjectDocWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ProjectDocOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: ProjectDocOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => ProjectDocWhereUniqueInput, {
    nullable: true
  })
  cursor?: ProjectDocWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [ProjectDocScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"projectDid" | "projectDoc" | "txHash" | "creator" | "created"> | undefined;
}
