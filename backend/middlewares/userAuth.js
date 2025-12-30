// middleware to check if user is authenticated

import jwt from "jsonwebtoken";
import "dotenv/config";

const userAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ success: false, message: "please log in." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.id };
  } catch (error) {
    return res.json({ success: false, message: "invalid token." });
  }

  next();
};

export default userAuth;
