import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  try {
    console.log(process.env.JWT_SECRET)
    const token = await req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await decodedToken;
    console.log(user)
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request"),
    });
  }
};
