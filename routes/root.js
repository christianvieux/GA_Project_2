// routes/root
const express = require("express");
const { route } = require("./auth");
const router = express.Router();

// root, which redirects to /home
router.get("/", (req, res) => {
    res.redirect("/home");
})

// /home page
router.get("/home", (req, res) => {
    res.render("layout.ejs", {currentPage: "pages/home.ejs"});
})

module.exports = router;