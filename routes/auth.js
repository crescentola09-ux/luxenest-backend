const express = require("express");
const { signup,login,getAllUsers, getSingleUser, updateProfile} = require("../controllers/auth");

const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/users/:id", protect, adminOnly, getSingleUser);
router.put("/profile", protect, updateProfile);
module.exports = router;
