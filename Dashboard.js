import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Prelim Exam Challenges</h1>

      <nav className="dashboard-nav">
        <Link className="dashboard-link" to="/challenge3/edit">Challenge 3 Edit User</Link>
        <Link className="dashboard-link" to="/challenge4/addpet">Challenge 4 Add Pet</Link>
        <Link className="dashboard-link" to="/challenge5/viewpets">Challenge 5 View Pets</Link>
        <Link className="dashboard-link" to="/challenge6/petscount">Challenge 6 Pets Count</Link>
        <Link className="dashboard-link" to="/challenge12/deletepet">Challenge 12 Delete Pet</Link>
        <Link className="dashboard-link" to="/challenge13/userages">Challenge 13 User Ages</Link>
        <Link className="dashboard-link" to="/challenge14/userscount">Challenge 14 Users Count</Link>
        <Link className="dashboard-link logout" to="/logout">Log Out</Link>
      </nav>

      <Outlet />
    </div>
  );
}
