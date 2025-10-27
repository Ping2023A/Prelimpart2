import React, { useState } from "react";
import "./Challenge4AddPet.css";

const BASE_URL = "https://prelim-exam.onrender.com";

export default function Challenge4AddPet() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAddPet = async () => {
    const ownerId = localStorage.getItem("itmc_id");
    if (!ownerId) {
      setAnswer("Error: Owner ID not found. Complete signup/login first.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/pets/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerId, name, type }),
      });
      const data = await res.json();
      setAnswer(JSON.stringify(data, null, 2));

      if (data.petId) {
        localStorage.setItem("itmc_petId", data.petId);
      }
    } catch (error) {
      setAnswer("Error: " + error.message);
    }
  };

  return (
    <div className="addpet-container">
      <h2 className="addpet-title">Challenge 4: Add Pet</h2>
      <div className="addpet-form">
        <input
          type="text"
          placeholder="Pet Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pet Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <button onClick={handleAddPet}>Add Pet</button>
      </div>
      <pre className="addpet-answer">{answer}</pre>
    </div>
  );
}
