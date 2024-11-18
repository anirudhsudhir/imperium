import express from "express";
import { checkSchema, validationResult } from "express-validator";

import db from "../db/db.mjs";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();

const USERS_COLLECTION = "users";

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

router.post("/signin", checkSchema(userLoginSchema), async (req, res) => {
  console.log("[USERS][/signin][POST] Received a /signin request on the users route")
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("[USERS][/signin][POST] Invalid endpoint schema -> ", errors)
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { username, password } = req.body;

  let collection = db.collection(USERS_COLLECTION);

  let result = await collection.findOne({ username: username });
  if (!result) {
    console.log("[USERS][/signin][POST] No such user -> ", username)
    return res.status(400).json({
      username: "Username does not exist",
    });
  }

  if (result["password"] != password) {
    console.log("[USERS][/signin][POST] Incorrect password for user -> ", password, username)
    return res.status(400).json({
      password: "Incorrect password",
    });
  }

  const token = jsonwebtoken.sign({ username }, process.env.TOKEN_SECRET);
  console.log("[USERS][/signin][POST] Sending JWT -> ", token)
  res.status(200).json(token);
});

router.post("/signup", checkSchema(userSignupSchema), async (req, res) => {
  console.log("[USERS][/signup][POST] Received a /signin request on the users route")
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("[USERS][/signup][POST] Invalid endpoint schema -> ", errors)
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, username, password } = req.body;

  let collection = db.collection(USERS_COLLECTION);

  let result = await collection.findOne({ username: username });
  if (!result) {
    let result = await collection.insertOne(req.body);
    console.log("[USERS][/signup][POST] Created user with password in DB -> ", username, password)
  } else {
    console.log("[USERS][/signup][POST] User already exists -> ", username)
    return res.status(400).json({
      username: "Username already exists",
    });
  }

  const token = jsonwebtoken.sign({ username }, process.env.TOKEN_SECRET);
  console.log("[USERS][/signup][POST] Sending JWT -> ", token)
  res.status(200).json(token);
});

export function authenticateToken(req, res, next) {
  console.log("[AUTH-MIDDLEWARE]starting auth for request with body: ", req.body);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    console.log("[AUTH-MIDDLEWARE] no authorization token specified");
    return res.status(401).json("no authorization token specified");
  }

  jsonwebtoken.verify(token, process.env.TOKEN_SECRET, (err, tokenClaims) => {
    if (err) {
      console.log("[AUTH-MIDDLEWARE]", err);
      return res.status(403).json("invalid authorization token" + token);
    }

    req.user = tokenClaims.username;
    console.log("[AUTH-MIDDLEWARE] authenticated user: ", req.user);

    next();
  });
}

export default router;
