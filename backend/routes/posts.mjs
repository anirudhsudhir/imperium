import express from "express";

import db from "../db/db.mjs";
import { authenticateToken } from "./users.mjs";
import { ObjectId } from "mongodb";
import { checkSchema } from "express-validator";

const router = express.Router();

const POSTS_COLLECTION = "posts";

const postCreateUpdateSchema = {
  title: {
    errorMessage: "Empty post title is invalid",
    notEmpty: true,
  },
  body: {
    errorMessage: "Empty post body is invalid",
    notEmpty: true,
  },
  author: {
    errorMessage: "Empty post author is invalid",
    notEmpty: true,
  },
};

router.use(authenticateToken);

// First 10 posts
router.get("/", async (req, res) => {
  let collection = db.collection(POSTS_COLLECTION);
  let postResults = await collection
    .find({ author: { $ne: req.user } })
    .limit(10)
    .toArray();

  res.json(postResults).status(200);
});

router.get("/all", async (req, res) => {
  let collection = db.collection(POSTS_COLLECTION);
  let postResults = await collection
    .find({ author: { $ne: req.user } })
    .toArray();

  res.json(postResults).status(200);
});

router.post(
  "/create",
  checkSchema(postCreateUpdateSchema),
  async (req, res) => {
    if (req.body.author != req.user) {
      return res
        .json("creating a post with another username is an invalid operation")
        .status(400);
    }

    let collection = db.collection(POSTS_COLLECTION);
    let newPost = req.body;
    console.log(`Received posts/create with body: `);
    console.log(req.body);
    newPost.date = new Date();

    let result = await collection.insertOne(newPost);
    res.json(result).status(204);
  },
);

router.get("/:id", async (req, res) => {
  const query = { _id: ObjectId.createFromHexString(req.params.id) };

  let collection = db.collection(POSTS_COLLECTION);
  let result = await collection.findOne(query);

  res.json(result).status(200);
});

router.put("/:id", checkSchema(postCreateUpdateSchema), async (req, res) => {
  if (req.body.author != req.user) {
    return res
      .json("updating a post with another username is an invalid operation")
      .status(400);
  }

  const query = { _id: ObjectId.createFromHexString(req.params.id) };
  let collection = db.collection(POSTS_COLLECTION);
  let result = await collection.replaceOne(query, req.body);

  res.json(result).status(200);
});

router.delete("/:id", async (req, res) => {
  if (req.body.author != req.user) {
    return res
      .json("deleting a post with another username is an invalid operation")
      .status(400);
  }

  const query = { _id: ObjectId.createFromHexString(req.params.id) };
  let collection = db.collection(POSTS_COLLECTION);
  let result = await collection.deleteOne(query);

  res.json(result).status(200);
});

export default router;
