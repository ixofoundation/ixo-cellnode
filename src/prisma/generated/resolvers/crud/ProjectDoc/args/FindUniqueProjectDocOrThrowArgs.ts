import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectDocWhereUniqueInput } from "../../../inputs/ProjectDocWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueProjectDocOrThrowArgs {
  @TypeGraphQL.Field(_type => ProjectDocWhereUniqueInput, {
    nullable: false
  })
  where!: ProjectDocWhereUniqueInput;
}