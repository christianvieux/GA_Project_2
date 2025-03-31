const express = require("express");
const router = express.Router({ mergeParams: true }); // Allows the router to inherit the params from server.js
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");

router.post("/:id/comments", auth, commentController.addComment);
router.get("/:id/comments/:commentId/edit", auth, commentController.getEditCommentForm);
router.put("/:id/comments/:commentId", auth, commentController.updateComment);
router.delete("/:id/comments/:commentId", auth, commentController.deleteComment);

module.exports = router;
