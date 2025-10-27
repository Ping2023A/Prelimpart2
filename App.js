import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Challenge1Signup from "./components/Challenge1Signup";
import Challenge2Login from "./components/Challenge2Login";
import Challenge3EditUser from "./components/Challenge3EditUser";
import Challenge4AddPet from "./components/Challenge4AddPet";
import Challenge5ViewPets from "./components/Challenge5ViewPets";
import Challenge6PetsCount from "./components/Challenge6PetsCount";
import Challenge12DeletePet from "./components/Challenge12DeletePet";
import Challenge13UserAges from "./components/Challenge13UserAges";
import Challenge14UsersCount from "./components/Challenge14UsersCount";
import Logout from "./components/Logout";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/challenge1" element={<Challenge1Signup />} />
          <Route path="/challenge2" element={<Challenge2Login />} />

          {/* Protected */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="challenge3/edit" element={<Challenge3EditUser />} />
            <Route path="challenge4/addpet" element={<Challenge4AddPet />} />
            <Route path="challenge5/viewpets" element={<Challenge5ViewPets />} />
            <Route path="challenge6/petscount" element={<Challenge6PetsCount />} />
            <Route path="challenge12/deletepet" element={<Challenge12DeletePet />} />
            <Route path="challenge13/userages" element={<Challenge13UserAges />} />
            <Route path="challenge14/userscount" element={<Challenge14UsersCount />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
