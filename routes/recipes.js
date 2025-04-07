const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const auth = require("../middleware/auth");


// Routes for recipes
router.get("/", recipeController.getAllRecipes);
router.get("/new", auth, recipeController.getNewRecipeForm);
router.get("/:recipeId", recipeController.getRecipeById);
router.get("/:recipeId/edit", auth, recipeController.getEditRecipeForm);
router.post("/", auth, recipeController.createRecipe);
router.put("/:recipeId", auth, recipeController.updateRecipe);
router.delete("/:recipeId", auth, recipeController.deleteRecipe);

module.exports = router;
