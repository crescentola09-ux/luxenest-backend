const Property = require("../models/property");
const mongoose = require("mongoose");

const isValidPropertyId = (id) => mongoose.isValidObjectId(id);

const sendDatabaseError = (res, error, action) => {
    const isValidationError = error.name === "ValidationError" || error.name === "CastError";

    return res.status(isValidationError ? 400 : 500).json({
        message: isValidationError ? error.message : `Failed to ${action}`
    });
};

const createProperty = async (req, res) => {
    try {
        const property = await Property.create(req.body);

        res.status(201).json({
            message: "Property created successfully",
            property: property
        });

    } catch (error) {
        sendDatabaseError(res, error, "create property");
    }
};


const getAllProperty = async (req, res) => {
    try {
        const properties = await Property.find();

        res.status(200).json({
            message: "Properties fetched successfully",
            properties: properties
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch properties",
            error: error.message
        });
    }
};


const getSingleProperty = async (req, res) => {
    try {
        if (!isValidPropertyId(req.params.id)) {
            return res.status(400).json({ message: "Invalid property ID" });
        }

        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            });
        }

        res.status(200).json({
            message: "Property fetched successfully",
            property: property
        });

    } catch (error) {
        sendDatabaseError(res, error, "fetch property");
    }
};


const updateProperty = async (req, res) => {
    try {
        const updateData = {
            ...req.body
        }

        if (updateData.listingType === "For Sale") {
            if (
                updateData.status !== "Available" &&
                updateData.status !== "Sold"
            ) {
                updateData.status = "Available"
            }
        }

        if (updateData.listingType === "For Rent") {
            if (
                updateData.status !== "Available" &&
                updateData.status !== "Rented"
            ) {
                updateData.status = "Available"
            }
        }

        const property = await Property.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        )

        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            })
        }

        res.status(200).json({
            message: "Property updated successfully",
            property: property
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to update property",
            error: error.message
        })
    }
}


const deleteProperty = async (req, res) => {
    try {
        if (!isValidPropertyId(req.params.id)) {
            return res.status(400).json({ message: "Invalid property ID" });
        }

        const property = await Property.findByIdAndDelete(req.params.id);

        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            });
        }

        res.status(200).json({
            message: "Property deleted successfully"
        });

    } catch (error) {
        sendDatabaseError(res, error, "delete property");
    }
};


module.exports = {
    createProperty,
    getAllProperty,
    getSingleProperty,
    updateProperty,
    deleteProperty
};
