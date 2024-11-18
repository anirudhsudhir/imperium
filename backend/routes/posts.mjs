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
  console.log("[POSTS][/][GET]Received a / request on the posts route")
  let collection = db.collection(POSTS_COLLECTION);
  let postResults = await collection
    .find({ author: { $ne: req.user } })
    .limit(10)
    .toArray();

  res.status(200).json(postResults);
});

router.get("/all", async (req, res) => {
  console.log("[POSTS][/][GET]Received a /all request on the posts route")
  let collection = db.collection(POSTS_COLLECTION);
  let postResults = await collection
    .find({ author: { $ne: req.user } })
    .toArray();

  res.status(200).json(postResults);
});

router.post(
  "/create",
  checkSchema(postCreateUpdateSchema),
  async (req, res) => {
    console.log("[POSTS][/create][POST] Received a /create request on the posts route")
    if (req.body.author != req.user) {
      console.log("[POSTS][/create][POST] creating a post with another username is an invalid operation")
      return res.status(400)
        .json("creating a post with another username is an invalid operation")
    }

    let collection = db.collection(POSTS_COLLECTION);
    let newPost = req.body;
    console.log("[POSTS][/create][POST] Received a /create request on the posts route with body -> ", req.body)
    newPost.date = new Date();

    let result = await collection.insertOne(newPost);
    res.status(204).json(result);
  },
);

router.get("/:id", async (req, res) => {
  console.log("[POSTS][/:id][GET]Received a /:id request on the posts route")
  const query = { _id: ObjectId.createFromHexString(req.params.id) };

  let collection = db.collection(POSTS_COLLECTION);
  let result = await collection.findOne(query);

  res.status(200).json(result);
});

router.put("/:id", checkSchema(postCreateUpdateSchema), async (req, res) => {
  console.log("[POSTS][/:id][PUT]Received a /:id request on the posts route")
  if (req.body.author != req.user) {
    console.log("[POSTS][PUT][/:id]updating a post with another username is an invalid operation")
    return res.status(200)
      .json("updating a post with another username is an invalid operation")
  }

  const query = { _id: ObjectId.createFromHexString(req.params.id) };
  let collection = db.collection(POSTS_COLLECTION);
  let result = await collection.replaceOne(query, req.body);

  res.status(200).json(result);
});

router.delete("/:id", async (req, res) => {
  console.log("[POSTS][/:id][DELETE]Received a /:id request on the posts route")
  if (req.body.author != req.user) {
    console.log("[POSTS][/:id][DELETE][/:id]deleting a post with another username is an invalid operation")
    return res.status(200)
      .json("deleting a post with another username is an invalid operation")
  }

  const query = { _id: ObjectId.createFromHexString(req.params.id) };
  let collection = db.collection(POSTS_COLLECTION);
  let result = await collection.deleteOne(query);

  res.status(200).json(result);
});

export default router;
