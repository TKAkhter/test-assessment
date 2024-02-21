import mongoose, { Document, Schema, Types } from "mongoose";

export interface IEpisode {
  title: string;
  watched: boolean;
  season?: number;
  episode?: number;
  imdburl?: string;
  Plot?: string;
  Poster?: string;
}

export interface IShow extends Document {
  title: string;
  episodes: IEpisode[];
  userId: Types.ObjectId;
  Year?: string;
  Genre?: string;
  Plot?: string;
  Poster?: string;
  imdburl?: string;
  totalSeasons?: number;
}

const ShowSchema: Schema = new Schema({
  title: String,
  Year: String,
  Genre: String,
  Plot: String,
  Poster: String,
  imdburl: String,
  totalSeasons: Number,
  episodes: [
    {
      title: String,
      watched: { type: Boolean, default: false },
      season: Number,
      episode: Number,
      imdburl: String,
      Plot: String,
      Poster: String,
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IShow>("Show", ShowSchema);
