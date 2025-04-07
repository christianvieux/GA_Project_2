const express = require("express");
const router = express.Router({ mergeParams: true }); // Allows the router to inherit the params from server.js
const likeController = require("../controllers/likeController");
const auth = require("../middleware/auth");

router.post("/like", auth, likeController.likeRecipe);
router.post("/unlike", auth, likeController.unlikeRecipe);

module.exports = router;
