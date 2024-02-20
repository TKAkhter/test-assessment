import { Router } from "express";

import { login, getShowList, addShow, removeShow, markEpisodeAsWatched, createUser } from '../controller/showController';

const router = Router();

router.post('/login', login);
router.post('/createuser', createUser);
router.get('/showlist', getShowList);
router.post('/addshow', addShow);
router.delete('/removeshow/:id', removeShow);
router.put('/markwatched/:id', markEpisodeAsWatched);

export default router;