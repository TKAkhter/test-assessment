import mongoose, { Schema, Document } from 'mongoose';

export interface IEpisode {
  title: string;
  watched: boolean;
}

export interface IShow extends Document {
  title: string;
  episodes: IEpisode[];
}

const ShowSchema: Schema = new Schema({
  title: String,
  episodes: [{
    title: String,
    watched: { type: Boolean, default: false }
  }]
});

export default mongoose.model<IShow>('Show', ShowSchema);