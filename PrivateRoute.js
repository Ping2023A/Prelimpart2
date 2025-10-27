import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  // ✅ DevMode allows immediate access
  if (!user) {
    return <Navigate to="/challenge2" replace />;
  }

  return children;
}
