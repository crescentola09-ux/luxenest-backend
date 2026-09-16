const express = require("express");

const {
    createProperty,
    getAllProperty,
    getSingleProperty,
    deleteProperty,
    updateProperty
} = require("../controllers/property");

const { protect, adminOnly} = require("../middleware/auth");

const route = express.Router();

// Public routes
route.get("/", getAllProperty);
route.get("/:id", getSingleProperty);

// Admin routes
route.post("/", protect, adminOnly, createProperty);
route.put("/:id", protect, adminOnly, updateProperty);
route.delete("/:id", protect, adminOnly, deleteProperty);

module.exports = route;
