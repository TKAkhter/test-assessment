import { Router } from "express";

import userRouter from "./users";
import authRouter from "./auth";
import taskRouter from "./tasks";
import { healthCheckRouter } from "../controller/index.controller";

const router = Router();

router.use("/v1/healthcheck", healthCheckRouter);
router.use("/v1/users", userRouter);
router.use("/v1/auth", authRouter);
router.use("/v1/tasks", taskRouter);

export default router;
