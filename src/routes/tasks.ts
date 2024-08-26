import { Router } from "express";
import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controller/tasks.controller";
import { validateToken } from "../middlewares/validate-token";

const taskRouter = Router();

taskRouter.get("/", validateToken, getAllTasks);
taskRouter.get("/:id", validateToken, getTask);

taskRouter.post("/", validateToken, createTask);
taskRouter.put("/:id", validateToken, updateTask);
taskRouter.delete("/:id", validateToken, deleteTask);

export default taskRouter;
