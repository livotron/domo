import express from "express";
import auth from "../src/auth.js";
import {
  acknowlegeClaim,
  createClaim,
  getClaims,
  matchClaim,
  startNewDive,
} from "../models/claims.js";

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", auth, async function (req, res) {
  const createdClaim = await createClaim(
    req.user.name,
    req.body.title,
    req.body.text,
    req.body.level,
    req
  );
  res.send(createdClaim);
});

router.post("/new-dive", auth, async function (req, res) {
  const createdDive = await startNewDive(req.user.name, req);
  res.send(createdDive);
});

router.post("/acknowledge", auth, async function (req, res) {
  const createdDive = await acknowlegeClaim(
    req.user.name,
    req.body.creationTime,
    req.body.creatorName,
    req
  );
  res.send(createdDive);
});

router.get("/by-time-and-user/:time/:name", auth, async function (req, res) {
  const claim = await matchClaim(req.params.name, req.params.time, req);
  res.send(claim);
});

router.get("/get-claims", auth, async function (req, res) {
  const claim = await getClaims(req.user.name, req);
  res.send(claim);
});

export default router;
