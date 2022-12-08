import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectDocUpdateInput } from "../../../inputs/ProjectDocUpdateInput";
import { ProjectDocWhereUniqueInput } from "../../../inputs/ProjectDocWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneProjectDocArgs {
  @TypeGraphQL.Field(_type => ProjectDocUpdateInput, {
    nullable: false
  })
  data!: ProjectDocUpdateInput;

  @TypeGraphQL.Field(_type => ProjectDocWhereUniqueInput, {
    nullable: false
  })
  where!: ProjectDocWhereUniqueInput;
}
