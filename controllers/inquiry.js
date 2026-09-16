const Inquiry = require("../models/inquiry");

const createInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.create(req.body);

        res.status(201).json({
            message: "Inquiry created successfully",
            inquiry: inquiry
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create inquiry",
            error: error.message
        });
    }
};

const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find()
            .populate("property")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Inquiries fetched successfully",
            inquiries: inquiries
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch inquiries",
            error: error.message
        });
    }
};

module.exports = {
    createInquiry,
    getAllInquiries
};