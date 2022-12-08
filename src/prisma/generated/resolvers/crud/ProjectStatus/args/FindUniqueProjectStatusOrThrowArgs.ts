import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectStatusWhereUniqueInput } from "../../../inputs/ProjectStatusWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueProjectStatusOrThrowArgs {
  @TypeGraphQL.Field(_type => ProjectStatusWhereUniqueInput, {
    nullable: false
  })
  where!: ProjectStatusWhereUniqueInput;
}
