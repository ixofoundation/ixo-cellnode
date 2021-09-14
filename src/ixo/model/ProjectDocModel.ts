import {Document, Model, model, Schema} from "mongoose";


export interface IProjectDocModel extends Document {
  doc: string
}

const ProjectDocSchema: Schema = new Schema({
  doc: String
}, {strict: false});

ProjectDocSchema.pre("save", function (next) {
  next();
});

export const ProjectDoc: Model<IProjectDocModel> = model<IProjectDocModel>("ProjectDoc", ProjectDocSchema);
