const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require("../middleware/validate");

// Signup route
router.post("/signup", validate.signup, authController.signup);

// Login route
router.post("/login", validate.login, authController.login);

// Logout route
router.post("/logout", authController.logout);

module.exports = router;
