import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { passport } from "../config/passport.js";

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

    return res.json({
      success: true,
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.json({
        success: false,
        message: info.message || "Invalid credentials.",
      });
    }

    req.login(user, (err) => {
      if (err) return next(err);

      // return res.json({
      //   success: true,
      //   message: "Login successful.",
      //   user: {
      //     id: user._id,
      //     username: user.username,
      //     email: user.email,
      //   },
      // });
      // ensure session is persisted before sending response
      req.session.save((saveErr) => {
        if (saveErr) return next(saveErr);

        return res.json({
          success: true,
          message: "Login successful.",
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
        });
      });
    });
  })(req, res, next);
};

const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err)
      return res.json({ success: false, message: "Logout failed. Try again" });
    res.json({ success: true, message: "Logged out successfully." });
  });
};

export { registerUser, loginUser, logoutUser };
