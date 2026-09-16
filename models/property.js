const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        propertyType: {
            type: String,
            required: true
        },

        bedrooms: {
            type: Number,
            required: true
        },

        bathrooms: {
            type: Number,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        image: {
            type: String
        },

        status: {
            type: String,
            default: "Available"
        },
        listingType: {
            type: String,
            enum: ["For Sale", "For Rent"],
            default: "For Sale"
        },



    },
    {
        timestamps: true
    }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;