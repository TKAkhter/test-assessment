import express from "express";

const router = express.Router();

router.get("/", async (_, res) => {
  const ENV = process.env.NODE_ENV!;
  const ORIGIN = process.env.ALLOW_ORIGIN!;
  const BASE = process.env.BASE_URL!;

  return res.status(200).json({
    env: ENV,
    origin: ORIGIN,
    base: BASE,
    callback: BASE + process.env.OAUTH_REDIRECT_URI,
    redirect: `${ORIGIN}merge/:platformID`,
  });
});

export default router;
