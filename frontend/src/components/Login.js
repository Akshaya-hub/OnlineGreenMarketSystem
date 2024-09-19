// src/components/Login.js
import React, { useState } from 'react';
import { login } from '../api';  // Import the login API function
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });  // Call the login API

      if (response.data.success) {
        // Redirect to profile page after successful login
        navigate('/profile', { state: { user: response.data.user } });
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
