import { AxiosError } from "axios";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Task from "../models/task.model";

export const getAllTasks = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const AllTasks = await Task.find();
    if (!AllTasks) {
      return res.status(400).json({ success: false, message: "Tasks not found" });
    }
    return res.json({ success: true, tasks: AllTasks });
  } catch (error_) {
    const error = error_ as AxiosError;
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getTask = async (req: Request, res: Response): Promise<Response | void> => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ id });
    if (!task) {
      return res.status(400).json({ success: false, message: "Task not Exist" });
    }
    return res.json({ success: true, task });
  } catch (error_) {
    const error = error_ as AxiosError;
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createTask = async (req: Request, res: Response): Promise<Response | void> => {
  const { title, description, completed } = req.body;

  try {
    const existingTask = await Task.findOne({ title });
    if (existingTask) {
      return res.status(400).json({ success: false, message: "Task already exists" });
    }
    const newTask = new Task({ id: uuidv4(), title, description, completed: completed ?? false });
    await newTask.save();
    return res.json({ success: true, message: "Task created successfully", task: newTask });
  } catch (error_) {
    const error = error_ as AxiosError;
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<Response | void> => {
  const { title, description, completed } = req.body;
  const { id } = req.params;

  try {
    const existingTask = await Task.findOneAndUpdate(
      { id },
      { title, description, completed: completed ?? false },
    );
    if (!existingTask) {
      return res.status(400).json({ success: false, message: "Task can not be updated" });
    }
    return res.json({ success: true, message: "User created successfully" });
  } catch (error_) {
    const error = error_ as AxiosError;
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<Response | void> => {
  const { id } = req.params;
  try {
    const existingTask = await Task.findOneAndDelete({ id });
    if (!existingTask) {
      return res.status(400).json({ success: false, message: "Task can not be updated" });
    }
    return res.json({ success: true, message: "Task deleted successfully" });
  } catch (error_) {
    const error = error_ as AxiosError;
    return res.status(500).json({ success: false, message: error.message });
  }
};
