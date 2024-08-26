import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  id: string;
  title: string;
  description: string;
  completed: string;
}

const TaskSchema: Schema = new Schema({
  id: String,
  title: String,
  description: String,
  completed: String,
});

export default mongoose.model<ITask>("Tasks", TaskSchema);
