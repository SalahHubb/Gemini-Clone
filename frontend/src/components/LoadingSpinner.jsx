import React from "react";
import { assets } from "../assets/assets.js";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      {assets.gemini_icon && (
        <img
          src={assets.gemini_icon}
          className="gemini-icon"
          alt="Loading..."
        />
      )}
    </div>
  );
};

export default LoadingSpinner;
