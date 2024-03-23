import express from "express";
import jwt from "jsonwebtoken";
import { getSession } from "../src/neo4j.js";

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async function (req, res, next) {
  try {
    const session = getSession();
    const query = await session.executeWrite((tx) => {
      return tx.run("CREATE (u:User {name: $name}) RETURN u.name as name", {
        name: req.body.name,
      });
    });
    res.send({ name: query.records[0].get("name") });
  } catch (e) {
    res.status(500).send({
      message: "Error creating user",
      error: e,
    });
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const session = getSession();
    const query = await session.executeRead((tx) => {
      return tx.run(
        "MATCH (u:User {name: $name}) RETURN u as user",
        { name: req.body.name }
      );
    });

    if(!query.records[0]) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const user = query.records[0].get("user");
    console.log(user);

    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    //   return success res
    res.status(200).send({
      message: "Login Successful",
      name: user.properties.name,
      token,
    });
  } catch (e) {
    console.log(e)
    res.status(500).send({
      message: "Error checking user",
      e,
    });
  }
});

export default router;
