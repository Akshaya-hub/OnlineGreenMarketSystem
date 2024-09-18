import express from "express"
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authroutes from "./routes/routes.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authroutes)

app.listen(PORT, ()=>{
    connectDB();
    console.log("Server is running on port 3000")
})

