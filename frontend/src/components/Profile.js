// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const email = location.state?.user.email;  // Get the email from location state

  useEffect(() => {
    if (email) {
      // Fetch user data from the backend based on the email
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/user/${email}`, {
            withCredentials: true, // Include credentials (cookies) in the request
          });
          setUserData(response.data);
        } catch (err) {
          setError('Failed to fetch user data.');
          console.error('Error fetching user data:', err);
        }
      };
      

      fetchUserData();
    } else {
      setError('No email provided.');
    }
  }, [email]);

  return (
    <div>
      <h2>User Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData ? (
        <div>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <p><strong>Contact Number:</strong> {userData.contactNo}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        !error && <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
