const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

// test //TODO: make sure u remove/cleanup this
router.get("/ping", (req, res) => {
    res.json({ message:"Pong!", ...req.body})
});

// View user profile
router.get("/:id", userController.getUser);

// Edit user profile (GET form)
router.get("/:id/edit", auth, userController.editUserForm);

// Update user profile
router.put("/:id", auth, validate.updateUser, userController.updateUser);

// Delete user account
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
