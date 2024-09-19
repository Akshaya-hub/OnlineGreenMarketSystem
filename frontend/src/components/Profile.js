import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactNo: ''
  });
  const email = location.state?.user.email;

  useEffect(() => {
    if (email) {
      // Fetch user data from the backend based on the email
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/user/${email}`);
          setUserData(response.data);
          setFormData({
            name: response.data.name,
            address: response.data.address,
            contactNo: response.data.contactNo
          });
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

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/user/${email}`, formData);
      setUserData(response.data);
      setEditMode(false);
    } catch (err) {
      setError('Failed to update user data.');
      console.error('Error updating user data:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/user/${email}`);
      // Redirect to login or home page after deletion
      navigate('/login');
    } catch (err) {
      setError('Failed to delete user.');
      console.error('Error deleting user:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout'); // Replace with your actual logout endpoint
      // Optionally clear local storage or cookies if needed
      navigate('/login');
    } catch (err) {
      setError('Failed to log out.');
      console.error('Error logging out:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>User Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData ? (
        <div>
          {editMode ? (
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
              />
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleInputChange}
                placeholder="Contact Number"
              />
              <button onClick={handleUpdate}>Save Changes</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Address:</strong> {userData.address}</p>
              <p><strong>Contact Number:</strong> {userData.contactNo}</p>
              <button onClick={() => setEditMode(true)}>Edit</button>
              <button onClick={handleDelete}>Delete Account</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        !error && <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
