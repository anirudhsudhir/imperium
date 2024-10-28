import express from "express";
import { checkSchema, validationResult } from "express-validator";

import db from "../db/db.mjs";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();

const USERS_COLLECTION = "users";
const JWT_EXPIRY_TIME = "900s";

const userLoginSchema = {
  username: {
    errorMessage: "Invalid username",
    notEmpty: true,
    escape: true,
  },
  password: {
    errorMessage: "Invalid password",
    notEmpty: true,
  },
};

const userSignupSchema = {
  email: {
    errorMessage: "Invalid email",
    isEmail: true,
  },
  username: {
    errorMessage: "Invalid username",
    notEmpty: true,
    escape: true,
  },
  password: {
    errorMessage: "Invalid password",
    notEmpty: true,
  },
};

router.post("/login", checkSchema(userLoginSchema), async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
    console.log("Valid request to /login with body: ");
    console.log(req.body);
  }

  const { username, password } = req.body;

  let collection = db.collection(USERS_COLLECTION);

  let result = await collection.findOne({ username: username });
  if (!result) {
    return res.status(400).json({
      errors: "no such user",
    });
  }

  if (result["password"] != password) {
    return res.status(400).json({
      errors: "incorrect password",
    });
  }

  const token = jsonwebtoken.sign(username, process.env.TOKEN_SECRET, {
    expiresIn: JWT_EXPIRY_TIME,
  });
  res.json(token).status(200);
});

router.post("/signup", checkSchema(userSignupSchema), async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  } else {
    console.log("Valid request to /signup with body: ");
    console.log(req.body);
  }

  const { email, username, password } = req.body;

  let collection = db.collection(USERS_COLLECTION);

  let result = await collection.findOne({ username: username });
  if (!result) {
    let result = await collection.insertOne(req.body);
  } else {
    return res.status(400).json({
      errors: "user with username already exists",
    });
  }

  const token = jsonwebtoken.sign(username, process.env.TOKEN_SECRET, {
    expiresIn: JWT_EXPIRY_TIME,
  });
  res.json(token).status(200);
});

export default router;
