import { AxiosError } from "axios";
import { Request, Response } from "express";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

import User from "../models/user";

export const createUser = async (req: Request, res: Response): Promise<Response | void> => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    const salt = Number.parseInt(process.env.HASH!);
    const newUser = new User({ username, password: await hash(password, salt) });
    await newUser.save();
    return res.json({ success: true, message: "User created successfully", user: newUser });
  } catch (error_) {
    const error = error_ as AxiosError;
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<Response | void> => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const comparePwd = await compare(password, user ? user.password : "");
    if (user && comparePwd) {
      const token = sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: "30 days" },
      );
      return res.json({ success: true, message: "Login successful", token });
    }
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (error_) {
    const error = error_ as AxiosError;
    return res.status(500).json({ success: false, message: error.message });
  }
};
