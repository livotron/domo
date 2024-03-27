import express from "express";
import jwt from "jsonwebtoken";
import { getSession } from "../src/neo4j.js";
import auth from "../src/auth.js";
import {
  checkVerifications,
  createSupportRelations,
  deleteOldVerification,
  getPartners,
  getUserByName,
  mergeUser,
  verifyExistingUser,
  verifyPartner,
} from "../models/user.js";

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

router.post("/login-old", async function (req, res, next) {
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

router.get("/by-name/:name", async function (req, res) {
  try {
    const user = await getUserByName(req.params.name, req);

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
    res.send(verify);
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
});

router.get("/partners/:name", async function (req, res) {
  try {
    const partners = await getPartners(req.params.name, req);
    return res.send(partners);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

router.post("/login", async function (req, res) {
  try {
    const { name, verifications } = req.body;
    const verified = await checkVerifications(name, verifications, req);
    if (!verified) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    await deleteOldVerification(name, "UP", req);
    await deleteOldVerification(name, "RIGHT", req);
    await deleteOldVerification(name, "DOWN", req);
    await deleteOldVerification(name, "LEFT", req);

    const supportRelations = await verifications.reduce(
      async (memo, verification) => {
        const results = await memo;
        await verifyExistingUser(
          name,
          verification.name,
          verification.direction,
          verification.hash,
          req
        );
        const supportRelation = await createSupportRelations(
          name,
          verification.name,
          verification.direction,
          req
        );
        return [...results, supportRelation];
      },
      []
    );
    const token = jwt.sign(
      {
        name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res.send({ partners: supportRelations, token});
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

export default router;
