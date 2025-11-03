import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import "dotenv/config";
import bcrypt from "bcrypt";
import User from "../models/userSchema.js";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        // Find user by email
        const user = await User.findOne({ email });

        // user not found
        if (!user) {
          return done(null, false, {
            message: "user not found. please register.",
          });
        }

        // check password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }

        // success
        return done(null, user);
      } catch (error) {
        console.log("Local authentication error: ", error.message);
        return done(error);
      }
    }
  )
);

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

        // Return the user (existing or newly created)
        done(null, user);
      } catch (error) {
        console.log("google authentication error: ", error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user); // attach on req.user
});

export { passport };
