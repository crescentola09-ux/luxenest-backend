const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendWelcomeEmail = require("../utils/sendEmail");

const signup = async (req, res) => {
    try {
        const { name, email, password, dob, gender } = req.body;


        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

       
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            dob,
            gender
        });

        try {
                 await sendWelcomeEmail(user.name, user.email);
            } catch (emailError) {
                console.log("Welcome email error:", emailError.message);
            }


        res.status(201).json({
            message: "Account created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log("Signup error:", error);

        res.status(500).json({
            message: "Failed to create account",
            error: error.message
        });
    }
};

   const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log("Login error:", error);

        res.status(500).json({
            message: "Failed to login",
            error: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 })

        res.status(200).json({
            users
        })
    } catch (error) {
        console.log("Get users error:", error)

        res.status(500).json({
            message: "Failed to get users",
            error: error.message
        })
    }
}


const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select("-password")

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            user
        })
    } catch (error) {
        console.log("Get user error:", error)

        res.status(500).json({
            message: "Failed to get user",
            error: error.message
        })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            })
        }

        const existingUser = await User.findOne({
            email,
            _id: { $ne: req.user.id }
        })

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                name,
                email
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-password")

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        console.log("Update profile error:", error)

        res.status(500).json({
            message: "Failed to update profile",
            error: error.message
        })
    }
}

module.exports = { signup, login, getAllUsers, getSingleUser,updateProfile };