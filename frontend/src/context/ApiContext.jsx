import axios from "axios";
import React, { createContext, useState } from "react";

export const apiContext = createContext();

const ApiContext = ({ children }) => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // create axios instance with credentials
  const api = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
  });

  // post message to backend and save to state
  const postMessage = async (conversationId, role, content) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { conversationId, role, content },
    ]);

    try {
      // save to db
      const response = await api.post("/api/chat/message", {
        conversationId,
        role,
        content,
      });

      console.log(response);
    } catch (error) {
      console.log("error occurred in the axios: ", error.message);
    }
  };

  const sendPrompt = async (prompt) => {
    setShowAnswer(true);

    // Use a local variable so we can use the id immediately
    let conversationId = currentConversationId;

    if (conversationId === null) {
      // create new conversation
      const response = await api.post("/api/chat/conversation", {
        title: prompt.slice(0, 20) + "...",
      });

      conversationId = response.data.conversationId;

      setCurrentConversationId(conversationId);
    }

    // add user message
    await postMessage(conversationId, "user", prompt);
    setPrompt("");

    // generate response
    setLoading(true);
    const res = await api.post("/api/chat/generate", {
      prompt,
      conversationId,
    });
    setLoading(false);

    // add the model response to local state
    setMessages((prevMessages) => [
      ...prevMessages,
      { conversationId, role: "model", content: res.data.message },
    ]);
  };

  const value = {
    prompt,
    setPrompt,
    messages,
    setMessages,
    postMessage,
    currentConversationId,
    setCurrentConversationId,
    showAnswer,
    setShowAnswer,
    loading,
    setLoading,
    backendUrl,
    sendPrompt,
    api,
    sidebarCollapsed,
    setSidebarCollapsed,
  };

  return <apiContext.Provider value={value}>{children}</apiContext.Provider>;
};

export default ApiContext;
