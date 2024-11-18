import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("[PING][/] Received ping request")
  res.json("pong");
});

export default router;
