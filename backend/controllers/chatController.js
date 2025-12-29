import Conversation from "../models/conversationSchema.js";
import Message from "../models/messageSchema.js";
import chat from "../config/gemini.js";

const getMessageList = async (req, res) => {
  if (!req.user)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  const { conversationId } = req.body;
  const userId = req.user._id;

  try {
    const messages = await Message.find({ userId, conversationId }).sort({
      createdAt: 1,
    });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const postMessage = async (req, res) => {
  try {
    const { conversationId, role, content } = req.body;
    
    if (!conversationId || !role || !content) {
      return res
        .status(400)
        .json({
          success: false,
          message: "conversationId, role and content are required.",
        });
    }
    const userId = req.user._id;

    const message = await Message.create({
      userId,
      conversationId,
      role,
      content,
    });

    res.status(201).json({ success: true, message });
  } catch (error) {
    console.error("Error posting message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getConversationList = async (req, res) => {
  const userId = req.user._id;

  try {
    const conversations = await Conversation.find({ userId }).sort({
      updatedAt: -1,
    });
    res.status(200).json({ success: true, conversations });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const postConversation = async (req, res) => {
  const { title } = req.body;
  const userId = req.user._id;

  try {
    const conversation = await Conversation.create({
      title,
      userId,
    });
    res.status(201).json({ success: true, conversationId: conversation._id });
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const generateResponse = async (req, res) => {
  const { prompt, conversationId } = req.body;

  const userId = req.user._id;

  try {
    const response = await chat(prompt);

    // save model response to messages
    await Message.create({
      userId,
      conversationId,
      role: "model",
      content: response,
    });

    res.status(200).json({ success: true, message: response });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  getMessageList,
  postMessage,
  getConversationList,
  postConversation,
  generateResponse,
};
