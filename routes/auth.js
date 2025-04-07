const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const validate = require("../middleware/validate.js");
const guestOnly = require("../middleware/guestOnly.js");


// Signup route
router.post("/signup", validate.signup, authController.signup);

// Login route
router.post("/login", validate.login, authController.login);

// Logout route
router.post("/logout", authController.logout);

// RENDER
router.get("/login", guestOnly, (req, res) => {
    res.render("layout.ejs", { currentPage: "pages/login.ejs", error: null }); // Pass a title or other data if needed
});

router.get("/signup", guestOnly, (req, res) => {
  res.render("layout.ejs", { currentPage: "pages/signup.ejs", error: null });
});

module.exports = router;
