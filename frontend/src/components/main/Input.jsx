import React, { useContext } from "react";
import { GoPlus } from "react-icons/go";
import { CgOptions } from "react-icons/cg";
import { IoMdSend } from "react-icons/io";
import { MdMic } from "react-icons/md";
import "./main.css";
import { apiContext } from "../../context/ApiContext";

const Input = () => {
  const { prompt, setPrompt, sendPrompt } = useContext(apiContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    sendPrompt(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="input">
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        type="text"
        placeholder="Ask Gemini"
      />
      <div className="tools">
        <div className="left">
          <GoPlus size={26} />
          <div className="option">
            <CgOptions className="icon" />
            <span>Tools</span>
          </div>
        </div>
        {prompt ? (
          <IoMdSend className="icon" />
        ) : (
          <button type="submit" className="send-btn">
            <MdMic className="icon" />
          </button>
        )}
      </div>
    </form>
  );
};

export default Input;
