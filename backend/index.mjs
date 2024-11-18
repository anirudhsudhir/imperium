import express from "express";
import cors from "cors";
import "./loadEnv.mjs";
import "express-async-errors";

import pingRouter from "./routes/ping.mjs";
import postsRouter from "./routes/posts.mjs";
import usersRouter from "./routes/users.mjs";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.log("[DEFAULT LOGGER] -> ", req.method, req.hostname, req.path, req.time);
  next();
});

app.use("/ping", pingRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.use((err, _req, res, next) => {
  res.status(500).json("Uh oh! An unexpected error occured - " + err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
