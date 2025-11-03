import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets.js";
import "./main.css";
import { IoMenuOutline } from "react-icons/io5";

import ChatView from "./ChatView.jsx";
import DefaultView from "./DefaultView.jsx";
import { apiContext } from "../../context/ApiContext.jsx";

const Main = () => {
  const { showAnswer, setSidebarCollapsed, sidebarCollapsed } =
    useContext(apiContext);

  return (
    <div className="main">
      <div className="chat-header">
        <div className="icon-title">
          <IoMenuOutline
            size={25}
            className="menu-icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          <p id="title">Gemini</p>
        </div>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="body">{showAnswer ? <ChatView /> : <DefaultView />}</div>
    </div>
  );
};

export default Main;
