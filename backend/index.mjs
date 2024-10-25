import express from "express";
import cors from "cors";
import "./loadEnv.mjs";
import "express-async-errors";

import pingRouter from "./routes/ping.mjs";
import postsRouter from "./routes/posts.mjs";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/ping", pingRouter);
app.use("/posts", postsRouter);

app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
