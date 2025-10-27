import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Challenge2Login.css"; // ✅ import the CSS

const BASE_URL = "https://prelim-exam.onrender.com";

export default function Challenge2Login() {
  const [username, setUsername] = useState(localStorage.getItem("itmc_username") || "");
  const [password, setPassword] = useState(localStorage.getItem("itmc_password") || "");
  const [authKey, setAuthKey] = useState(localStorage.getItem("itmc_code") || "");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password || !authKey) {
      setAnswer("Please provide username, password, and authentication key.");
      return;
    }

    setAnswer("Logging in...");

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
          authentication_key: authKey.trim(),
        }),
      });

      const data = await res.json();
      setAnswer(JSON.stringify(data, null, 2));

      if (data.id && data.code) {
        localStorage.setItem("itmc_id", data.id);
        localStorage.setItem("itmc_code", data.code);
        localStorage.setItem("itmc_username", username);
        localStorage.setItem("itmc_password", password);

        navigate("/"); // go to Dashboard
      } else {
        setAnswer("Login failed. Check your credentials and authentication key.");
      }
    } catch (err) {
      setAnswer("Error: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Challenge 2: Login</h2>
      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Authentication Key"
          value={authKey}
          onChange={(e) => setAuthKey(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>

      <p className="signup-link">
        Don’t have an account? <Link to="/challenge1">Sign up here</Link>
      </p>

      <pre className="login-answer">{answer}</pre>
    </div>
  );
}
