import express from "express";

import db from "../db/db.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

const POSTS_COLLECTION = "posts";

// First 10 posts
router.get("/", async (req, res) => {
  let collection = db.collection(POSTS_COLLECTION);
  let postResults = await collection.find({}).limit(10).toArray();

  res.send(postResults).status(200);
});

router.get("/all", async (req, res) => {
  let collection = db.collection(POSTS_COLLECTION);
  let postResults = await collection.find({}).toArray();

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

router.get("/:id", async (req, res) => {
  const query = { _id: ObjectId.createFromHexString(req.params.id) };

  let collection = db.collection(POSTS_COLLECTION);
  let result = await collection.findOne(query);

  res.send(result).status(200);
});

router.put("/:id", async (req, res) => {
  const query = { _id: ObjectId.createFromHexString(req.params.id) };

  let collection = db.collection(POSTS_COLLECTION);
  let result = await collection.replaceOne(query, req.body);

  res.send(result).status(200);
});

router.delete("/:id", async (req, res) => {
  const query = { _id: ObjectId.createFromHexString(req.params.id) };

  let collection = db.collection(POSTS_COLLECTION);
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
