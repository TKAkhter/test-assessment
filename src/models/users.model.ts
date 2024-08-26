import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  id: string;
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  id: String,
  username: String,
  password: String,
});

export default mongoose.model<IUser>("User", UserSchema);
