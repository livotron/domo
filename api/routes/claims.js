import express from "express";
import auth from "../src/auth.js";
import {
  acknowledgeClaim,
  createClaim,
  getClaims,
  getClaimsByUser,
  getUserFocus,
  incrementDive,
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

router.get("/get-dive", auth, async function (req, res) {
  const dive = await getUserFocus(req.user.name, res);
  res.send(dive);
});

router.post("/increment-dive", auth, async function (req, res) {
  try {
    const createdDive = await incrementDive(req.user.name, req);
    res.send(createdDive);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
});

router.post("/acknowledge", auth, async function (req, res) {
  const createdDive = await acknowledgeClaim(
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
  const claims = await getClaims(req.user.name, req);
  res.send(claims);
});

router.get("/claims-by-user/:name", auth, async function (req, res) {
  const claims = await getClaimsByUser(req.params.name, req);
  res.send(claims);
});

export default router;
