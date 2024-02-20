import { AxiosError } from "axios";
import { Request, Response } from "express";
import { compare, hash } from "bcryptjs";
import { Client, TVShow } from "imdb-api";

import User from "../models/user";
import Show from "../models/show";
import { imdbTvShowDataMapper } from "../helpers/tv-show-data-mapper";

const imdbClient = new Client({ apiKey: "81b2c5ff" });

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }
    // Create new user
    const salt = Number.parseInt(process.env.HASH!);
    const newUser = new User({ username, password: await hash(password, salt) });
    await newUser.save();
    res.json({ success: true, message: "User created successfully" });
  } catch (error_) {
    const error = error_ as AxiosError;
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const comparePwd = await compare(password, user ? user.password : "");
    if (user && comparePwd) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error_) {
    const error = error_ as AxiosError;
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getShowList = async (_: Request, res: Response): Promise<void> => {
  try {
    const shows = await Show.find();
    res.json({ success: true, shows });
  } catch (error_) {
    const error = error_ as AxiosError;
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addShow = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.body;
  try {
    const imdbData = await imdbClient.get({ name: title });
    const tvShow = new TVShow(imdbTvShowDataMapper(imdbData), { apiKey: "81b2c5ff" });
    const episodes = await tvShow.episodes();

    if (!imdbData) {
      res.status(404).json({ success: false, message: "Show not found on IMDb" });
      return;
    }

    const newShow = new Show({ title, episodes });
    await newShow.save();
    res.json({ success: true, message: "Show added successfully" });
  } catch (error_) {
    const error = error_ as AxiosError;
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeShow = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await Show.findByIdAndDelete(id);
    res.json({ success: true, message: "Show removed successfully" });
  } catch (error_) {
    const error = error_ as AxiosError;
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markEpisodeAsWatched = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const show = await Show.findById(id);
    if (!show) {
      res.status(404).json({ success: false, message: "Show not found" });
      return;
    }
    const episodeIndex = req.body.episodeIndex;
    show.episodes[episodeIndex].watched = true;
    await show.save();
    res.json({ success: true, message: "Episode marked as watched" });
  } catch (error_) {
    const error = error_ as AxiosError;
    res.status(500).json({ success: false, message: error.message });
  }
};
