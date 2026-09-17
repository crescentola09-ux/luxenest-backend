const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    console.log("AUTH HEADER:", req.headers.authorization);

    try {
        const token = req.headers.authorization?.split(" ")[1];

        console.log("TOKEN EXISTS:", !!token);

        if (!token) {
            return res.status(401).json({
                message: "No token provided. Please login."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
 
        console.log("JWT VERIFIED:", decoded);

        req.user = decoded;

        next();

    } catch (error) {
        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied. Admins only."
        });
    }

    next();
};

module.exports = {
    protect,
    adminOnly
};