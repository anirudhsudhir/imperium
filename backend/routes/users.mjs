import express from "express";
import { checkSchema, validationResult } from "express-validator";

import db from "../db/db.mjs";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();

const USERS_COLLECTION = "users";

const userLoginSchema = {
  username: {
    errorMessage: "Invalid username",
    notEmpty: true,
    escape: true,
  },
  password: {
    errorMessage: "Invalid password",
    notEmpty: true,
    escape: true,
  },
};

router.post("/login", checkSchema(userLoginSchema), async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
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

  const token = jsonwebtoken.sign(username, proccess.env.TOKEN_SECRET);
  res.json(token).status(200);
});

// router.post("/signup", checkSchema(userSignupSchema), async (req, res) => {});

export default router;
