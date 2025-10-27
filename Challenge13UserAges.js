import React, { useState, useEffect } from "react";
import "./Challenge13UserAges.css";

const BASE_URL = "https://prelim-exam.onrender.com";

export default function Challenge13UserAges() {
  const [oldest, setOldest] = useState("");
  const [youngest, setYoungest] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const fetchAges = async () => {
      try {
        const res = await fetch(`${BASE_URL}/stats/users/ages`);
        const data = await res.json();

        const message = data.message || "";
        const oldestMatch = message.match(/oldest:\[([^\]]+)\]/);
        const youngestMatch = message.match(/youngest:\[([^\]]+)\]/);

        if (oldestMatch) setOldest(oldestMatch[1]);
        if (youngestMatch) setYoungest(youngestMatch[1]);

        setAnswer(message);
      } catch (error) {
        setAnswer("Error fetching user ages: " + error.message);
      }
    };

    fetchAges();
  }, []);

  return (
    <div className="userages-container">
      <h2 className="userages-title">Challenge 13: User Ages Stats</h2>
      <p className="userages-info"><strong>Oldest user:</strong> {oldest}</p>
      <p className="userages-info"><strong>Youngest user:</strong> {youngest}</p>

      <pre className="userages-answer">{answer}</pre>
    </div>
  );
}
