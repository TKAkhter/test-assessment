import { Router } from "express";

import userRouter from "./users";
import authRouter from "./auth";
import taskRouter from "./tasks";
import { healthCheckRouter } from "../controller/index.controller";
import showsRouter from "./shows";

const router = Router();

router.use("/v1/healthcheck", healthCheckRouter);

router.use("/v1/users", userRouter);
router.use("/v1/auth", authRouter);
router.use("/v1/tasks", taskRouter);
router.use("/v1/shows", showsRouter);

export default router;
