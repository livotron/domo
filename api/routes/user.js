import express from "express";
import jwt from "jsonwebtoken";
import { getSession } from "../src/neo4j.js";
import auth from "../src/auth.js";
import { getUserByName, mergeUser, verifyPartner } from "../models/user.js";

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async function (req, res, next) {
  try {
    const user = await getUserByName(req.body.name, req);

    if (user) {
      return res.status(409).send({
        message: "User already exists",
      });
    }

    const registeredUser = await mergeUser(
      req.body.name,
      req.body.password,
      req
    );
    const { password, ...passwordlessUser } = registeredUser;
    res.send(passwordlessUser);
  } catch (e) {
    res.status(500).send({
      message: "Error creating user",
      error: e,
    });
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const user = await getUserByName(req.body.name, req);

    if (!user) {
      return res.status(401).send({
        message: "User data incorrect",
      });
    }

    if (user.password !== req.body.password) {
      return res.status(401).send({
        message: "User data incorrect",
      });
    }
    const token = jwt.sign(
      {
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    //   return success res
    res.status(200).send({
      message: "Login Successful",
      user,
      token,
    });
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
});

router.get("/me", auth, async function (req, res) {
  try {
    const user = await getUserByName(req.user.name, req);

    return res.status(200).send(user);
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
});

router.post("/verify", auth, async function (req, res) {
  try {
    const verify = await verifyPartner(
      req.user.name,
      req.body.partnerName,
      req.body.direction,
      req.body.hash,
      req
    );
    res.send(verify)
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
});

export default router;
