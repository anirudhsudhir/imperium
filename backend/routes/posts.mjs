import express from "express";

import db from "../db/db.mjs";
import { authenticateToken } from "./users.mjs";
import { ObjectId } from "mongodb";
import { checkSchema } from "express-validator";

const router = express.Router();

export const BLOGS_COLLECTION = "posts";

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

router.get("/all", async (req, res) => {
  console.log("[POSTS][/][GET]Received a /all request on the posts route")
  let collection = db.collection(BLOGS_COLLECTION);
  let postResults = await collection
    .find({})
    .toArray();

  res.status(200).json(postResults);
});

// Specific user posts
router.get("/user/:username", async (req, res) => {
  console.log("[POSTS][/user/:username][GET]Received a /user/:username request on the posts route")
  let collection = db.collection(BLOGS_COLLECTION);
  let postResults = await collection
    .find({ author: req.params.username })
    .toArray();

  res.status(200).json(postResults);
});

router.post(
  "/create",
  checkSchema(postCreateUpdateSchema),
  async (req, res) => {
    console.log("[POSTS][/create][POST] Received a /create request on the posts route")

    let collection = db.collection(BLOGS_COLLECTION);
    let newPost = req.body;
    newPost.author = req.user;
    newPost.date = new Date();

    let result = await collection.insertOne(newPost);
    console.log("[POSTS][/create][POST] Inserted blog to DB -> ", req.body)
    console.log("[POSTS][/create][POST] DB Result -> ", result)
    res.status(200).json({ blogId: result.insertedId.toString() });
  },
);

router.get("/:id", async (req, res) => {
  console.log("[POSTS][/:id][GET]Received a /:id request on the posts route")
  const query = { _id: ObjectId.createFromHexString(req.params.id) };

  let collection = db.collection(BLOGS_COLLECTION);
  let result = await collection.findOne(query);

  res.status(200).json(result);
});

router.put("/:id", checkSchema(postCreateUpdateSchema), async (req, res) => {
  console.log("[POSTS][/:id][PUT]Received a /:id request on the posts route")

  let updatedPost = req.body;
  updatedPost.author = req.user;
  updatedPost.date = new Date();
  const query = { _id: ObjectId.createFromHexString(req.params.id) };
  let collection = db.collection(BLOGS_COLLECTION);
  let blogToUpdate = await collection.findOne(query);

  if (blogToUpdate.author != req.user) {
    console.log("[POSTS][/:id][DELETE][/:id]deleting a post with another username is an invalid operation")
    return res.status(400)
      .json("updating a post with another username is an invalid operation")
  }
  let result = await collection.replaceOne(query, updatedPost);

  console.log("[POSTS][/:id][PUT] Updated blog in DB -> ", req.body)
  console.log("[POSTS][/:id][PUT] DB Result -> ", result)
  res.status(200).json({ blogId: req.params.id });
});

router.delete("/:id", async (req, res) => {
  console.log("[POSTS][/:id][DELETE]Received a /:id request on the posts route")

  const query = { _id: ObjectId.createFromHexString(req.params.id) };
  let collection = db.collection(BLOGS_COLLECTION);
  let blogToDelete = await collection.findOne(query);

  if (blogToDelete.author != req.user) {
    console.log("[POSTS][/:id][DELETE][/:id]deleting a post with another username is an invalid operation")
    return res.status(400)
      .json("deleting a post with another username is an invalid operation")
  }
  let result = await collection.deleteOne(query);

  console.log("[POSTS][/:id][DELETE] Deleted blog from DB -> ", result)
  res.status(200).json(result);
});

export default router;
