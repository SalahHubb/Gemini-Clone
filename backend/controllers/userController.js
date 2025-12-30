import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { passport } from "../config/passport.js";
import "dotenv/config";

// ------------ //

// utilities
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const buildCookieOptions = () => {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  };
};

// --------------- //

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.json({ success: false, message: "user already exists" });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    user = await newUser.save();

    // create jwt and send to browser cookie
    const token = createToken(user._id);

    res.cookie("token", token, buildCookieOptions());

    // registration successful
    return res.json({
      success: true,
      message: "user registered successfully",
      user: { _id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    // create jwt and send to browser cookie
    const token = createToken(user._id);

    res.cookie("token", token, buildCookieOptions());

    // login successful
    return res.json({
      success: true,
      message: "Login successful",
      user: { _id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.json({ success: false, message: "Server error" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    ...buildCookieOptions(),
  });

  return res.json({ success: true, message: "Logout successful" });
};

export { registerUser, loginUser, logoutUser };
