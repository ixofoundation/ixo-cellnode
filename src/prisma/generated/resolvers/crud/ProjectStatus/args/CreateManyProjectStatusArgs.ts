import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectStatusCreateManyInput } from "../../../inputs/ProjectStatusCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyProjectStatusArgs {
  @TypeGraphQL.Field(_type => [ProjectStatusCreateManyInput], {
    nullable: false
  })
  data!: ProjectStatusCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
