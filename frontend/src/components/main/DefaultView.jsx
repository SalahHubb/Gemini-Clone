import React from "react";
import "./main.css";
import Input from "./Input";

const DefaultView = () => {
  return (
    <div className="default-view">
      <div className="greet">Hello, Mo</div>

      <div className="features">
        <div className="cards">
          <div className="card">Create Image</div>
          <div className="card">Write</div>
          <div className="card">Build</div>
          <div className="card">Deep Research</div>
          <div className="card">Learn</div>
        </div>

        <Input />
      </div>
    </div>
  );
};

export default DefaultView;
