import express from "express";
import auth from "../src/auth.js";

var router = express.Router();

router.get("/", function (req, res, next) {
  res.send([
    {
      completed: false,
      id: "5f13c24f-aa90-42a3-993d-a9cd7a1d0de2",
      text: "Todo 1",
    },
    {
      completed: false,
      id: "ed64c99f-7d66-46cd-9878-03d55ec1e86a",
      text: "Todo 2",
    },
    {
      completed: false,
      id: "8b21a5f5-1ed6-43ab-9758-ae27d078f306",
      text: "Todo 3",
    },
  ]);
});

router.get("/free-endpoint", (req, res, next) => {
  res.send({ message: "You are free to access me anytime" });
});

router.get("/auth-endpoint", auth, (req, res, next) => {
   res.send({ message: "You are authorized to access me"})
});

export default router;
