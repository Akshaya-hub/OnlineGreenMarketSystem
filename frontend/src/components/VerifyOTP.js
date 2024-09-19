// src/components/VerifyOTP.js
import React, { useState } from 'react';
import { verifySignup } from '../api';  // Import the verifySignup function
import { useLocation, useNavigate } from 'react-router-dom';  // Import useLocation and useNavigate hooks

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();  // Get location data
  const navigate = useNavigate();  // Initialize navigate hook
  const email = location.state?.email || '';  // Get email from location state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifySignup({ email, otp });  // Call verifySignup API
      console.log(response.data);
      
      if (response.data.success) {
        // Redirect to login page after successful OTP verification
        navigate('/login');
      }
    } catch (error) {
      setError('OTP Verification failed. Please try again.');
      console.error('OTP Verification failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} readOnly placeholder="Email" />
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default VerifyOTP;
