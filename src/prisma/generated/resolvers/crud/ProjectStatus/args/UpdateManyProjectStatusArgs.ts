import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectStatusUpdateManyMutationInput } from "../../../inputs/ProjectStatusUpdateManyMutationInput";
import { ProjectStatusWhereInput } from "../../../inputs/ProjectStatusWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyProjectStatusArgs {
  @TypeGraphQL.Field(_type => ProjectStatusUpdateManyMutationInput, {
    nullable: false
  })
  data!: ProjectStatusUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => ProjectStatusWhereInput, {
    nullable: true
  })
  where?: ProjectStatusWhereInput | undefined;
}
