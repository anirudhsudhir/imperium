import express from "express";

import db from "../db/db.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

const POSTS_COLLECTION = "posts";

// A get request to posts retreives the first 10 posts
router.get("/", async (req, res) => {
  let collection = db.collection(POSTS_COLLECTION);
  let postResults = await collection.find({}).limit(10).toArray();

  res.send(postResults).status(200);
});

router.post("/create", async (req, res) => {
  let collection = db.collection(POSTS_COLLECTION);

  let newPost = req.body;
  console.log(`Received posts/create with body: `);
  console.log(req.body);
  newPost.date = new Date();

  let result = await collection.insertOne(newPost);
  res.send(result).status(204);
});

router.delete("/delete/:id", async (req, res) => {
  let collection = db.collection(POSTS_COLLECTION);

  const query = { _id: ObjectId(res.params.id) };
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
