import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectDocCreateManyInput } from "../../../inputs/ProjectDocCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyProjectDocArgs {
  @TypeGraphQL.Field(_type => [ProjectDocCreateManyInput], {
    nullable: false
  })
  data!: ProjectDocCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
