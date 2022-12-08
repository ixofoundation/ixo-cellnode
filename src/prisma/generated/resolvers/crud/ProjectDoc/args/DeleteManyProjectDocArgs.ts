import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectDocWhereInput } from "../../../inputs/ProjectDocWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyProjectDocArgs {
  @TypeGraphQL.Field(_type => ProjectDocWhereInput, {
    nullable: true
  })
  where?: ProjectDocWhereInput | undefined;
}
