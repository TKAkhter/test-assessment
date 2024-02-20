import { Router } from "express";

import {
  addShow,
  createUser,
  getShowList,
  login,
  removeShow,
  toogleMarkEpisodeAsWatched,
} from "../controller/shows.controller";

const router = Router();

router.post("/login", login);
router.post("/createuser", createUser);
router.get("/showlist", getShowList);
router.post("/addshow", addShow);
router.delete("/removeshow/:id", removeShow);
router.put("/tooglemarkwatched/:id", toogleMarkEpisodeAsWatched);

export default router;
