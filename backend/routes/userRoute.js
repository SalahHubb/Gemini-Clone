import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";
import { passport } from "../config/passport.js";

import "dotenv/config";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login/local", loginUser);
userRouter.post("/logout", userAuth, logoutUser);

// Google OAuth Routes
userRouter.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/`,
    successRedirect: `${process.env.FRONTEND_URL}/chat`,
  })
);

export default userRouter;
