import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectStatusCreateInput } from "../../../inputs/ProjectStatusCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneProjectStatusArgs {
  @TypeGraphQL.Field(_type => ProjectStatusCreateInput, {
    nullable: false
  })
  data!: ProjectStatusCreateInput;
}
