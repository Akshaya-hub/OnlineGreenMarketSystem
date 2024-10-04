const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/connectDB.js');
const authroutes = require('./routes/routes.js');
const session = require('express-session');
const userRoutes = require('./routes/user.js'); // User routes
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to handle JSON
app.use(express.json());
app.use(express.static('public'));

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3001", // Allow frontend requests from this origin
    credentials: true, // Allow cookies and credentials to be sent with the request
  })
);

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // true for HTTPS
      sameSite: "lax", // Adjust as needed
      maxAge: 10 * 60 * 1000, // 10 minutes
    },
  })
);

// Routes
app.use("/api/auth", authroutes);
app.use("/api", userRoutes); // User routes

// Use product routes
app.use('/api/products', productRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
    });
}

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
