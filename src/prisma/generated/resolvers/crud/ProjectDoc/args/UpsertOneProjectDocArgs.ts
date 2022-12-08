import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectDocCreateInput } from "../../../inputs/ProjectDocCreateInput";
import { ProjectDocUpdateInput } from "../../../inputs/ProjectDocUpdateInput";
import { ProjectDocWhereUniqueInput } from "../../../inputs/ProjectDocWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneProjectDocArgs {
  @TypeGraphQL.Field(_type => ProjectDocWhereUniqueInput, {
    nullable: false
  })
  where!: ProjectDocWhereUniqueInput;

  @TypeGraphQL.Field(_type => ProjectDocCreateInput, {
    nullable: false
  })
  create!: ProjectDocCreateInput;

  @TypeGraphQL.Field(_type => ProjectDocUpdateInput, {
    nullable: false
  })
  update!: ProjectDocUpdateInput;
}
