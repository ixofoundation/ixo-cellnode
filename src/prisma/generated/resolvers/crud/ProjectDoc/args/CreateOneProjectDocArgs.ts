import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectDocCreateInput } from "../../../inputs/ProjectDocCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneProjectDocArgs {
  @TypeGraphQL.Field(_type => ProjectDocCreateInput, {
    nullable: false
  })
  data!: ProjectDocCreateInput;
}
