import { Router } from "express";

import { validateToken } from "../middlewares/validate-token";
import {
  addShow,
  getAllShows,
  getShow,
  removeShow,
  toggleMarkEpisodeAsWatched,
} from "../controller/shows.controller";

const showsRouter = Router();

showsRouter.get("/:userId", validateToken, getAllShows);

showsRouter.post("/:userId", validateToken, addShow);
showsRouter.get("/:userId/:id", validateToken, getShow);
showsRouter.put("/:userId/:id/toggle-mark-watched", validateToken, toggleMarkEpisodeAsWatched);
showsRouter.delete("/:userId/:id", validateToken, removeShow);

export default showsRouter;
