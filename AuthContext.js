import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // ✅ toggle this to true to skip login and proceed directly to Dashboard
  const devMode = true;

  const [user, setUser] = useState(
    devMode ? { id: "dummy123", username: "testuser", code: "dummycode" } : null
  );

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
