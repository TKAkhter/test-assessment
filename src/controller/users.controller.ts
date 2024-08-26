import { AxiosError } from "axios";
import { Request, Response } from "express";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import User from "../models/users.model";

export const getAllUsers = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const AllUser = await User.find();
    if (!AllUser) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, users: AllUser });
  } catch (error_) {
    const error = error_ as AxiosError;
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUser = async (req: Request, res: Response): Promise<Response | void> => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not Exist" });
    }
    return res.json({ success: true, user });
  } catch (error_) {
    const error = error_ as AxiosError;
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createUser = async (req: Request, res: Response): Promise<Response | void> => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    const salt = Number.parseInt(process.env.HASH!);
    const newUser = new User({ id: uuidv4(), username, password: await hash(password, salt) });
    await newUser.save();
    return res.json({ success: true, message: "User created successfully", user: newUser });
  } catch (error_) {
    const error = error_ as AxiosError;
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response | void> => {
  const { username } = req.body;
  const { id } = req.params;

  try {
    const existingUser = await User.findOneAndUpdate({ id }, { username });
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "User can not be updated" });
    }
    return res.json({ success: true, message: "User created successfully" });
  } catch (error_) {
    const error = error_ as AxiosError;
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response | void> => {
  const { id } = req.params;
  try {
    const existingUser = await User.findOneAndDelete({ id });
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "User can not be updated" });
    }
    return res.json({ success: true, message: "User deleted successfully" });
  } catch (error_) {
    const error = error_ as AxiosError;
    return res.status(500).json({ success: false, message: error.message });
  }
};
