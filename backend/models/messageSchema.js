import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    userId: { type: String },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    role: { type: String },
    content: { type: String },
  },
  { timestamps: true } // <--- this line automatically adds createdAt and updatedAt
);

const Message = mongoose.model("message", messageSchema);

export default Message;
