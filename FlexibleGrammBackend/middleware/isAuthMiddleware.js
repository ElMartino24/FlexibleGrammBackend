import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json("No Token");
    }

    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified.userId;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json("Token set wrong in middleware");
  }
};
