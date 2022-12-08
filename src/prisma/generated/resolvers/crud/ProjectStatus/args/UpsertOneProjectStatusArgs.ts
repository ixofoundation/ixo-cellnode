import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectStatusCreateInput } from "../../../inputs/ProjectStatusCreateInput";
import { ProjectStatusUpdateInput } from "../../../inputs/ProjectStatusUpdateInput";
import { ProjectStatusWhereUniqueInput } from "../../../inputs/ProjectStatusWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneProjectStatusArgs {
  @TypeGraphQL.Field(_type => ProjectStatusWhereUniqueInput, {
    nullable: false
  })
  where!: ProjectStatusWhereUniqueInput;

  @TypeGraphQL.Field(_type => ProjectStatusCreateInput, {
    nullable: false
  })
  create!: ProjectStatusCreateInput;

  @TypeGraphQL.Field(_type => ProjectStatusUpdateInput, {
    nullable: false
  })
  update!: ProjectStatusUpdateInput;
}
