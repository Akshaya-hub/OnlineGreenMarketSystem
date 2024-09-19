import express from "express"
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authroutes from "./routes/routes.js";
import session from 'express-session';


dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET, // Store a secret key in your .env file
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // In production, set this to true and use HTTPS
}));

app.use("/api/auth", authroutes)
connectDB();

app.listen(PORT, ()=>{
    
    console.log("Server is running on port 3000")
})






