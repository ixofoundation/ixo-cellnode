import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectStatusUpdateInput } from "../../../inputs/ProjectStatusUpdateInput";
import { ProjectStatusWhereUniqueInput } from "../../../inputs/ProjectStatusWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneProjectStatusArgs {
  @TypeGraphQL.Field(_type => ProjectStatusUpdateInput, {
    nullable: false
  })
  data!: ProjectStatusUpdateInput;

  @TypeGraphQL.Field(_type => ProjectStatusWhereUniqueInput, {
    nullable: false
  })
  where!: ProjectStatusWhereUniqueInput;
}
