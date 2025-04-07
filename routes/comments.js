const express = require("express");
const router = express.Router({ mergeParams: true }); // Allows the router to inherit the params from server.js
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");

router.post("/new", auth, commentController.addComment);
router.delete("/:commentId", auth, commentController.deleteComment);

module.exports = router;
