import React, { useContext, useState, useEffect, useRef } from "react";
import "./sidebar.css";
import { IoMenuOutline } from "react-icons/io5";
import { MdOpenInNew } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { PiChatDotsLight } from "react-icons/pi";
import { IoCodeSlashOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { apiContext } from "../../context/ApiContext";

const Sidebar = () => {
  const [conversations, setConversations] = useState([]);
  const {
    api,
    currentConversationId,
    setCurrentConversationId,
    setShowAnswer,
    sidebarCollapsed,
    setSidebarCollapsed,
  } = useContext(apiContext);

  const sidebarRef = useRef(null);

  const fetchConversations = async () => {
    // fetch conversations from backend
    try {
      const response = await api.get("/api/chat/conversations");
      if (response.data.success) {
        setConversations(response.data.conversations);
      } else {
        console.error("Failed to fetch conversations:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (currentConversationId) {
      fetchConversations();
    }
  }, [currentConversationId]);

  const handleNewChat = () => {
    setCurrentConversationId(null);
    setShowAnswer(false);
    setMessages([]);
  };

  const handleConversationClick = (id) => {
    setCurrentConversationId(id);
    setShowAnswer(true);
  };

  return (
    <div
      className={`sidebar ${sidebarCollapsed ? "collapsed" : "expanded"}`}
      ref={sidebarRef}
    >
      <div className="menu between">
        <IoMenuOutline
          className="icon"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        {sidebarCollapsed ? null : <IoSearchOutline />}
      </div>

      <div className="between">
        <div onClick={() => handleNewChat()} className="item">
          <MdOpenInNew className="icon" />
          {sidebarCollapsed ? null : <p className="new-chat">New chat</p>}
        </div>
        {sidebarCollapsed ? null : (
          <div>
            <PiChatDotsLight className="icon" />
          </div>
        )}
      </div>

      <div className="list">
        {sidebarCollapsed ? null : (
          <div>
            <div className="explore">
              <p className="title">Gems</p>

              <div className="explore-list">
                <div className="item">
                  <div className="code">
                    <IoCodeSlashOutline className="icon" />
                  </div>
                  <p>Coding partner</p>
                </div>
                <div className="item">
                  <MdOutlineExplore className="icon" />
                  <p>Explore games</p>
                </div>
              </div>
            </div>

            <p className="title">Recent</p>

            <div className="recent-list">
              {conversations.length > 0 &&
                conversations.map((conv) => {
                  return (
                    <div
                      onClick={() => handleConversationClick(conv._id)}
                      key={conv._id}
                      className={`${
                        currentConversationId === conv._id ? "current" : ""
                      }`}
                    >
                      {conv.title}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      <div className="bottom item">
        <CiSettings />
        {sidebarCollapsed ? null : <p>Settings and help</p>}
      </div>
    </div>
  );
};

export default Sidebar;
