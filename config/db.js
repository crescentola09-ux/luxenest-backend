const mongoose = require("mongoose");
const envObj = require("./env");

const connectDB = async () => {
    const mongoUrl = envObj.mongoUrl;

    if (!mongoUrl) {
        throw new Error("MONGODB_URL is missing from the .env file");
    }

    try {
        await mongoose.connect(mongoUrl, {
            connectTimeoutMS: 10000,
            serverSelectionTimeoutMS: 10000
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        throw new Error(
            `MongoDB connection failed: ${error.message}. ` +
            "Check your Atlas database user credentials and add your current IP address to Network Access."
        );
    }
};

module.exports = connectDB;
