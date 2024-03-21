const mongoose = require("mongoose")
require("dotenv").config();

const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const db = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Database connection successfully");
    } catch (err) {
        console.log("Database connection error", err);
    }
}

module.exports = db;