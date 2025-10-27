import React, { useState, useEffect } from "react";
import "./Challenge5ViewPets.css";

const BASE_URL = "https://prelim-exam.onrender.com";

export default function Challenge5ViewPets() {
  const [pets, setPets] = useState([]);
  const [answer, setAnswer] = useState("");
  const myId = localStorage.getItem("itmc_id");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch(`${BASE_URL}/pets?userId=${myId}`);
        const data = await res.json();
        setPets(data.pets || []);
        setAnswer(data.message || "Pets loaded.");
      } catch (error) {
        setAnswer("Error fetching pets: " + error.message);
      }
    };

    fetchPets();
  }, [myId]);

  return (
    <div className="viewpets-container">
      <h2 className="viewpets-title">Challenge 5: View Pets</h2>

      {pets.length === 0 ? (
        <p>No pets found.</p>
      ) : (
        <table className="viewpets-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Owner</th>
              <th>Is Mine?</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet._id}>
                <td>{pet.name}</td>
                <td>{pet.type}</td>
                <td>{pet.owner.username || pet.owner._id}</td>
                <td>{pet.owner._id === myId ? "✅ Yes" : "❌ No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <pre className="viewpets-answer">{answer}</pre>
    </div>
  );
}
