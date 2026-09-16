const express = require("express");
const { getAllInquiries, createInquiry} = require("../controllers/inquiry");

const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, adminOnly, getAllInquiries);
router.post("/new", createInquiry);


module.exports = router;