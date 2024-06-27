require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.url;

const connectDB = async ()=> {
    try {
        await mongoose.connect(url);
        console.log("Connection Successfull");
    } catch (error) {
        console.log(error);        
    }
}

module.exports = connectDB;