import mongoose, { Document, Schema, Types } from "mongoose";

export interface IEpisode {
  title: string;
  watched: boolean;
}

export interface IShow extends Document {
  title: string;
  episodes: IEpisode[];
  userId: Types.ObjectId;
}

const ShowSchema: Schema = new Schema({
  title: String,
  episodes: [
    {
      title: String,
      watched: { type: Boolean, default: false },
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IShow>("Show", ShowSchema);
