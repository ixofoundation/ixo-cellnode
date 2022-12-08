import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectDocUpdateManyMutationInput } from "../../../inputs/ProjectDocUpdateManyMutationInput";
import { ProjectDocWhereInput } from "../../../inputs/ProjectDocWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyProjectDocArgs {
  @TypeGraphQL.Field(_type => ProjectDocUpdateManyMutationInput, {
    nullable: false
  })
  data!: ProjectDocUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => ProjectDocWhereInput, {
    nullable: true
  })
  where?: ProjectDocWhereInput | undefined;
}
