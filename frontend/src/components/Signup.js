// src/components/Signup.js
import React, { useState } from 'react';
import { signup } from '../api';  // Import the signup function
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    contactNo: '',
    password: ''
  });
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(formData);  // Call the signup function
      console.log(response.data);
      
      if (response.data.success) {
        // Redirect to OTP page with email as a query parameter (optional)
        navigate('/verifyotp', { state: { email: formData.email } });
      }
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
      <input type="text" name="contactNo" value={formData.contactNo} onChange={handleChange} placeholder="Contact Number" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
