import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiContext } from "../context/ApiContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const { api } = React.useContext(apiContext);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await api.post("/api/user/register", {
        username,
        email,
        password,
      });
      if (response.data.success) {
        // navigate to login page
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <div className="header">
          <h1>Sign Up</h1>
        </div>

        <div className="input-box">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            id="username"
            required
          />
          <label htmlFor="username">username</label>
        </div>

        <div className="input-box">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            required
          />
          <label htmlFor="email">Email or phone</label>
        </div>

        <div className="input-box">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            required
          />
          <label htmlFor="password">Password</label>
        </div>

        <button onClick={handleSignUp} className="sign-up-btn">
          Sign up
        </button>

        <div className="bottom">
          Already have account?
          <Link to={"/"}>
            <span>Login here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
