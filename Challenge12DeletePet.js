import React, { useState, useEffect } from "react";
import "./Challenge12DeletePet.css";

const BASE_URL = "https://prelim-exam.onrender.com";

export default function Challenge12DeletePet() {
  const [pets, setPets] = useState([]);
  const [answer, setAnswer] = useState("");
  const myId = localStorage.getItem("itmc_id");

  useEffect(() => {
    if (!myId) {
      setAnswer("No userId found. Make sure you are logged in.");
      return;
    }

    const fetchPets = async () => {
      try {
        const res = await fetch(`${BASE_URL}/pets?userId=${myId}`);
        const data = await res.json();

        if (data.pets?.length > 0) {
          setPets(data.pets);
          setAnswer(data.message || "Pets loaded.");
        } else {
          setAnswer("No pets found.");
        }
      } catch (error) {
        setAnswer("Error fetching pets: " + error.message);
      }
    };

    fetchPets();
  }, [myId]);

  const handleDelete = async (petId) => {
    try {
      const res = await fetch(`${BASE_URL}/pets/${petId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setAnswer(data.message || "Pet deleted successfully!");
      setPets(pets.filter((p) => p._id !== petId));
    } catch (error) {
      setAnswer("Error deleting pet: " + error.message);
    }
  };

  return (
    <div className="deletepet-container">
      <h2 className="deletepet-title">Challenge 12: Delete Pet</h2>

      {pets.length === 0 ? (
        <p>No pets to delete.</p>
      ) : (
        <table className="deletepet-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Owner</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet._id}>
                <td>{pet.name}</td>
                <td>{pet.type}</td>
                <td>
                  {typeof pet.owner === "object"
                    ? pet.owner.username || pet.owner._id
                    : pet.owner}
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(pet._id)}
                  >
                    Delete Pet
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <pre className="deletepet-answer">{answer}</pre>
    </div>
  );
}
