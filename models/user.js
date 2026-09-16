const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [3, "Name must be at least three characters long"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address"
            ],
            lowercase: true,
            trim: true
        },

        dob: {
            type: Date
        },

        password: {
            type: String,
            required: true,
            minlength: [8, "Password must be at least eight characters long"]
        },

        gender: {
            type: String,
            enum: ["male", "female"]
        },

        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema)