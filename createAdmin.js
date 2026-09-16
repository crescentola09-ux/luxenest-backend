const bcrypt = require("bcryptjs");
const User = require("./models/user");
const connectDB = require("./config/db");
const mongoose = require("mongoose");

const createAdmin = async () => {
    let exitCode = 0;

    try {
        console.log("Connecting to MongoDB...");
        await connectDB();

        const existingAdmin = await User.findOne({
            email: "luxenest@gmail.com"
        });

        if (existingAdmin) {
            console.log("Admin account already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash(
            "Admin222",
            10
        );

        const admin = await User.create({
            name: "LuxeNest Account",
            email: "luxenest@gmail.com",
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin account created successfully!");
        console.log("Email:", admin.email);
        console.log("Role:", admin.role);

    } catch (error) {
        console.log("Error creating admin:", error.message);
        exitCode = 1;
    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        process.exitCode = exitCode;
    }
};

createAdmin();
