import React, { useState, useEffect } from "react";
import "./Challenge14UsersCount.css";

const BASE_URL = "https://prelim-exam.onrender.com";

export default function Challenge14UsersCount() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const fetchUsersCount = async () => {
      try {
        const res = await fetch(`${BASE_URL}/stats/users/count`);
        const data = await res.json();

        setAnswer(data.message || "No message returned.");

        const match = data.message.match(/users:(\d+)/);
        if (match) setTotalUsers(parseInt(match[1]));

      } catch (error) {
        setAnswer("Error fetching users count: " + error.message);
      }
    };

    fetchUsersCount();
  }, []);

  return (
    <div className="userscount-container">
      <h2 className="userscount-title">Challenge 14: Total Users Count</h2>
      <p className="userscount-number">Total Users: {totalUsers}</p>

      <pre className="userscount-answer">{answer}</pre>
    </div>
  );
}
