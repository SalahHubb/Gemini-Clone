import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.CALLBACK_URL}/api/user/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check if user already exists
        let user = await User.findOne({
          $or: [{ googleId: profile.id }, { email: profile.emails[0].value }],
        });

        // if user doesn't exist, create a new one
        if (!user) {
          const newUser = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            avatar: profile.photos[0].value,
          });

          user = await newUser.save();
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        });
      } catch (error) {
        console.log("google authentication error: ", error);
        return done(error);
      }
    }
  )
);

export { passport };
