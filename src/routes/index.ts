import { Router } from "express";

import { createUser, login } from "../controller/controller";

const router = Router();

router.post("/login", login);
router.post("/create-user", createUser);

export default router;
