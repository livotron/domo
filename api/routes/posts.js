import express from "express";
import auth from "../src/auth.js";
import { createPost, startNewDive } from "../models/posts.js";

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", auth, async function (req, res) {
  const createdPost = await createPost(
    req.user.name,
    req.body.title,
    req.body.text,
    req.body.level,
    req
  );
  res.send(createdPost);
});

router.post("/new-dive", auth, async function (req, res) {
  const createdDive = await startNewDive(
    req.user.name,
    req
  );
  res.send(createdDive);
});

export default router;
