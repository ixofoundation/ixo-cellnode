import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ProjectStatusWhereInput } from "../../../inputs/ProjectStatusWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyProjectStatusArgs {
  @TypeGraphQL.Field(_type => ProjectStatusWhereInput, {
    nullable: true
  })
  where?: ProjectStatusWhereInput | undefined;
}
