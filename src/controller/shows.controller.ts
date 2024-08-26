import { AxiosError } from "axios";
import { Request, Response } from "express";
import { compare, hash } from "bcryptjs";
import { Client, TVShow } from "imdb-api";
import { sign } from "jsonwebtoken";
import { imdbTvShowDataMapper, imdbTvShowKeyFormatter } from "../utils/helper";
import User from "../models/users.model";
import Show from "../models/shows.model";

const imdbClient = new Client({ apiKey: process.env.OMDB_API_KEY });

export const getAllShows = async (req: Request, res: Response): Promise<Response | void> => {
  const { userId } = req.params;
  try {
    const shows = await Show.find({ userId });
    return res.json({ success: true, shows });
  } catch (error_) {
    const error = error_ as AxiosError;
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getShow = async (req: Request, res: Response): Promise<Response | void> => {
  const { userId, id } = req.params;
  try {
    const shows = await Show.find({ userId, _id: id });
    return res.json({ success: true, shows });
  } catch (error_) {
    const error = error_ as AxiosError;
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addShow = async (req: Request, res: Response): Promise<Response | void> => {
  const { userId } = req.params;
  const { title } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isShowAlreadyExist = await Show.findOne({ title, userId });

    if (isShowAlreadyExist) {
      return res.status(403).json({ success: false, message: "Show Already Added in list" });
    }

    const imdbData = await imdbClient.get({ name: title });

    if (!imdbData) {
      return res.status(404).json({ success: false, message: "Show not found on IMDb" });
    }

    const tvShow = new TVShow(imdbTvShowDataMapper(imdbData), { apiKey: process.env.OMDB_API_KEY });
    const episodes = await tvShow.episodes();

    const newShow = new Show({
      ...imdbTvShowKeyFormatter(imdbTvShowDataMapper(imdbData)),
      episodes,
      userId,
    });
    await newShow.save();
    return res.json({ success: true, message: "Show added successfully", show: newShow });
  } catch (error_) {
    const error = error_ as AxiosError;
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleMarkEpisodeAsWatched = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  const { userId, id } = req.params;
  const { watched, episodeIndex } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const show = await Show.findById(id);
    if (!show) {
      return res.status(404).json({ success: false, message: "Show not found" });
    }

    if (show.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to update this show" });
    }

    show.episodes[episodeIndex].watched = watched;
    await show.save();
    const UpdatedShows = await Show.find({ userId });
    return res.json({
      success: true,
      message: `Episode marked as ${watched ? "watched" : "un-watched"}`,
      shows: UpdatedShows,
    });
  } catch (error_) {
    const error = error_ as AxiosError;
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const removeShow = async (req: Request, res: Response): Promise<Response | void> => {
  const { userId, id } = req.params;
  try {
    await Show.findByIdAndDelete(id);
    const UpdatedShows = await Show.find({ userId });
    res.json({ success: true, message: "Show removed successfully", shows: UpdatedShows });
  } catch (error_) {
    const error = error_ as AxiosError;
    res.status(500).json({ success: false, message: error.message });
  }
};
