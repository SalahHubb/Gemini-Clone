import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { apiContext } from "../context/ApiContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { api } = useContext(apiContext);
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignIn = async () => {
    try {
      const response = await api.post("/api/user/login/local", {
        email,
        password,
      });

      if (response.data.success) {
        // Handle successful login
        navigate("/chat");
      } else {
        // Handle login failure
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = backendUrl + "/api/user/login/google";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="header">
          <h1>Welcome</h1>
          <p>We are happy to have you back!</p>
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

        <div className="middle-text">
          <div className="check">
            <input type="checkbox" name="checkbox" id="checkbox" />
            <label htmlFor="checkbox">Remember me</label>
          </div>
          <p className="forgot">Forgot password?</p>
        </div>

        <button onClick={handleSignIn} className="sign-in-btn">
          Sign in
        </button>

        <div className="or-box">
          <hr />
          <p className="or-text">Or</p>
        </div>

        <div onClick={handleGoogleLogin} className="google-box">
          <img
            src={assets.google_icon}
            alt="google icon"
            className="google-icon"
          />
          <p>Continue with Google</p>
        </div>

        <div className="bottom">
          Don't have account?{" "}
          <Link to={"/signup"}>
            <span>Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
