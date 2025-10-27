import React, { useState, useEffect } from "react";
import "./Challenge3EditUser.css";

const BASE_URL = "https://prelim-exam.onrender.com";

export default function Challenge3EditUser() {
  const [id] = useState(localStorage.getItem("itmc_id") || "");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("student");
  const [answer, setAnswer] = useState("");

  const roles = ["student", "vet", "admin", "faculty", "backend"];

  useEffect(() => {
    if (!id) {
      setAnswer("Cannot fetch user: ID is missing. Complete signup/login first.");
      return;
    }

    fetch(`${BASE_URL}/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.user?.username || "");
        setRole(data.user?.role || "student");
        setAnswer("Loaded user:\n" + JSON.stringify(data, null, 2));
      })
      .catch((err) => setAnswer("Error fetching user: " + err.message));
  }, [id]);

  const handleUpdate = async () => {
    if (!id) {
      setAnswer("Cannot update: ID is missing.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, role }),
      });

      const data = await res.json();
      setAnswer("User updated:\n" + JSON.stringify(data, null, 2));
    } catch (err) {
      setAnswer("Error updating user: " + err.message);
    }
  };

  return (
    <div className="edit-container">
      <h2 className="edit-title">Challenge 3: Edit User</h2>

      <div className="edit-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <label className="edit-role">
          Role:{" "}
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <button onClick={handleUpdate}>Update User</button>
      </div>

      <pre className="edit-answer">{answer}</pre>
    </div>
  );
}
