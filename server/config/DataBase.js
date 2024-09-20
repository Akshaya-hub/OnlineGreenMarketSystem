const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.set('strictQuery', false); // or true, depending on your preference
    mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }).then(() => {
        console.log("Connected to MongoDB Atlas");
    }).catch((e) => {
        console.error("Error connecting to MongoDB Atlas:", e);
    });
}

module.exports = connectDB;
