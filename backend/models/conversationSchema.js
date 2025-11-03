import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    userId: { type: String },
    title: { type: String },
  },
  { timestamps: true }
);

const Conversation =
  mongoose.models.conversations ||
  mongoose.model("conversation", conversationSchema);

export default Conversation;
