import React, { useState } from "react";
import { apiRequest } from "../api/api";
import "./Challenge1Signup.css"; // ✅ import the CSS

export default function Challenge1Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiRequest("/signup", "POST", { 
        username, 
        password,
        age: Number(age)
      });

      setAnswer(JSON.stringify(data, null, 2));

      if (data.id) localStorage.setItem("itmc_id", data.id);
      if (data.code) localStorage.setItem("itmc_code", data.code);
      if (username) localStorage.setItem("itmc_username", username);
      if (password) localStorage.setItem("itmc_password", password);
    } catch (error) {
      setAnswer(error.message || String(error));
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Challenge 1: Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e)=>setAge(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {answer && (
        <div className="signup-answer">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}
