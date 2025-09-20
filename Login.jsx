import React, { useState } from "react";
import "./Login.css";
import { FaRegEyeSlash, FaRegEye, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]=useState(false);
  const navigate = useNavigate();

  // 🔥 Function la "e" parameter venum
  const handleLogin = (e) => {
    e.preventDefault(); // Form submit refresh stop

    if (!username || !password) {
      alert("Please enter username & password");
      return;
    }

    if(username === "malini" && password === "malu1234") {

    setLoading(true);
    setTimeout(()=>{

    // Token generate function
    function generateToken(length) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    const token = generateToken(200);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);

    setLoading(false);

    // Dashboard ku move
    navigate("/dashboard");
  }, 2000);
  
} else {
  alert("invalid username or password");
}
};
  if (loading){
    return(
    <div className="loading-page">
<div className="spinner"></div>
<p>loading...</p>
    </div>
    );
  }

  return (
    
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome Back</h1>
        <p>Please login to continue</p>

        {/* ✅ onSubmit = handleLogin */}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
            <span className="icon">
              <FaUser />
            </span>
          </div>

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
            <span
              className="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="options">
            <label className="remember">
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#" className="forgot-link">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="btn" >
            Login
            
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;