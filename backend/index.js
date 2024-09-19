import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import CORS
import { connectDB } from "./db/connectDB.js";
import authroutes from "./routes/routes.js";
import session from 'express-session';
import userRoutes from './routes/user.js'; // User routes




dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to handle JSON
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3001', // Allow frontend requests from this origin
    credentials: true // Allow cookies and credentials to be sent with the request
}));

// Session middleware

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,

    cookie: { 
        secure: process.env.NODE_ENV === 'production', // true for HTTPS
        sameSite: 'lax', // Adjust as needed
        maxAge: 10 * 60 * 1000 // 10 minutes
    }
}));


// Routes
app.use("/api/auth", authroutes);
app.use('/api', userRoutes); // User routes


// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
