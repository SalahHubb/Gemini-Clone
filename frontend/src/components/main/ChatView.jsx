import React, { useContext, useEffect, useState } from "react";
import 'highlight.js/styles/github-dark.css'; 
import "./main.css";
import Input from "./Input";
import { IoIosArrowDown } from "react-icons/io";
import { assets } from "../../assets/assets";
import { apiContext } from "../../context/ApiContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import LoadingSpinner from "../LoadingSpinner";

const ChatView = () => {
  const { messages, setMessages, currentConversationId, api, loading } =
    useContext(apiContext);

  const EndMessageRef = React.useRef(null);

  const fetchMessages = async () => {
    // Function to fetch messages from backend
    const response = await api.post(`/api/chat/messages`, {
      conversationId: currentConversationId,
    });

    if (response.data.success) {
      // If the response is successful, update the messages state
      setMessages(response.data.messages);
    } else {
      console.error("Failed to fetch messages:", response.data.message);
    }
  };

  const scrollToBottom = () => {
    EndMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (currentConversationId) {
      fetchMessages();
    }
  }, [currentConversationId]);

  useEffect(() => {
    // if only prompts change scroll to bottom
    if (messages.length > 0 && messages[messages.length - 1].role === "user") {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <div className="chat-view">
      <div className="chat">
        {messages.length > 0 &&
          messages.map((message) => {
            if (message.role == "user") {
              return <div className="prompt">{message.content}</div>;
            } else {
              return (
                <div className="answer">
                  <div className="top">
                    <img src={assets.gemini_icon} alt="" />
                    <div>
                      <p>Show Thinking</p>
                      <IoIosArrowDown />
                    </div>
                  </div>
                  <div className="text markdown-body">
                    {/* use markdown processor */}

                    <ReactMarkdown
                      children={message.content}
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    />
                  </div>
                </div>
              );
            }
          })}

        {loading ? (
          <div className="answer">
            <div className="top">
              <LoadingSpinner />
              <p>Show Thinking</p>
            </div>
          </div>
        ) : null}
        <div ref={EndMessageRef} />
      </div>

      <div className="prompt-input">
        <Input />
        <p>Gemini can make mistake. so double check it.</p>
      </div>
    </div>
  );
};

export default ChatView;
