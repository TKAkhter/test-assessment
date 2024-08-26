import { Router } from "express";

import { validateToken } from "../middlewares/validate-token";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controller/users.controller";

const userRouter = Router();

userRouter.post("/", createUser);

userRouter.get("/", validateToken, getAllUsers);
userRouter.get("/:id", validateToken, getUser);
userRouter.put("/:id", validateToken, updateUser);
userRouter.delete("/:id", validateToken, deleteUser);

export default userRouter;
