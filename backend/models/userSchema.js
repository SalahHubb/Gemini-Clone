import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // only for local auth
  googleId: { type: String }, // only for google auth
  avatar: { type: String },
});

const User = mongoose.models.users || mongoose.model("user", userSchema);

export default User;
