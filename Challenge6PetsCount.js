import React, { useState, useEffect } from "react";
import "./Challenge6PetsCount.css";

const BASE_URL = "https://prelim-exam.onrender.com";

export default function Challenge6PetsCount() {
  const [count, setCount] = useState(0);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(`${BASE_URL}/stats/pets/count`);
        const data = await res.json();

        const match = data.message.match(/pet_count:(\d+)/);
        if (match) setCount(Number(match[1]));

        setAnswer(JSON.stringify(data, null, 2));
      } catch (error) {
        setAnswer("Error fetching pets count: " + error.message);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="petscount-container">
      <h2 className="petscount-title">Challenge 6: Total Pets Count</h2>
      <p className="petscount-number">Total Pets: {count}</p>
      <pre className="petscount-answer">{answer}</pre>
    </div>
  );
}
