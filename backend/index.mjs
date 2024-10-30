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

app.use("/ping", pingRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.use((err, _req, res, next) => {
  res.json("Uh oh! An unexpected error occured - " + err).status(500);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
