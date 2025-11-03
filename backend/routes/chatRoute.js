import express from "express";
import {
  getMessageList,
  postMessage,
  getConversationList,
  postConversation,
  generateResponse,
} from "../controllers/chatController.js";
import userAuth from "../middlewares/userAuth.js";

const chatRouter = express.Router();

chatRouter.post("/messages", userAuth, getMessageList);
chatRouter.post("/message", userAuth, postMessage);

chatRouter.get("/conversations", userAuth, getConversationList);
chatRouter.post("/conversation", userAuth, postConversation);

chatRouter.post("/generate", userAuth, generateResponse);

export default chatRouter;
