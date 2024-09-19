import express from 'express';
const router = express.Router();
import { User } from '../models/model.js'; // Ensure this is the correct import

// Route to get user details by email
router.get('/user/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });  // Fetch user by email
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);  // Return user data
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
