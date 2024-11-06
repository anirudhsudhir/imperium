import express from "express";
import { checkSchema, validationResult } from "express-validator";

import db from "../db/db.mjs";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();

const USERS_COLLECTION = "users";
const JWT_EXPIRY_TIME = 900;

const userLoginSchema = {
  username: {
    errorMessage: "Empty username is invalid",
    notEmpty: true,
    escape: true,
  },
  password: {
    errorMessage: "Empty password is invalid",
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
    return res
      .json({
        errors: errors.array(),
      })
      .status(400);
  } else {
    console.log("Valid request to /login with body: ");
    console.log(req.body);
  }

  const { username, password } = req.body;

  let collection = db.collection(USERS_COLLECTION);

  let result = await collection.findOne({ username: username });
  if (!result) {
    return res
      .json({
        errors: "no such user",
      })
      .status(400);
  }

  if (result["password"] != password) {
    return res
      .json({
        errors: "incorrect password",
      })
      .status(400);
  }

  const token = jsonwebtoken.sign({ username }, process.env.TOKEN_SECRET, {
    expiresIn: JWT_EXPIRY_TIME,
  });
  res.json(token).status(200);
});

router.post("/signup", checkSchema(userSignupSchema), async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .json({
        errors: errors.array(),
      })
      .status(400);
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
    return res
      .json({
        errors: "user with username already exists",
      })
      .status(400);
  }

  const token = jsonwebtoken.sign({ username }, process.env.TOKEN_SECRET, {
    expiresIn: JWT_EXPIRY_TIME,
  });
  res.json(token).status(200);
});

export function authenticateToken(req, res, next) {
  console.log("starting auth for request with body: ", req.body);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    console.log("no authorization token specified");
    return res.json("no authorization token specified").status(401);
  }

  jsonwebtoken.verify(token, process.env.TOKEN_SECRET, (err, tokenClaims) => {
    if (err) {
      console.log(err);
      return res.json("invalid authorization token" + token).status(403);
    }

    req.user = tokenClaims.username;
    console.log("authenticated user: ", req.user);

    next();
  });
}

export default router;
