// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import VerifyOTP from './components/VerifyOTP';
import Login from './components/Login';
import Profile from './components/Profile';  // Import Profile component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/verifyotp" element={<VerifyOTP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />  {/* Add the profile route */}
      </Routes>
    </Router>
  );
}

export default App;
