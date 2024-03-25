import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error.message)
    res.status(401).json({
      message: 'Unauthorised',
    });
  }
};
