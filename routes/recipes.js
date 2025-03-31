const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const auth = require("../middleware/auth");


// Routes for recipes
router.get("/", recipeController.getAllRecipes);
router.get("/new", auth, recipeController.getNewRecipeForm);
router.post("/", auth, recipeController.createRecipe);
router.get("/:id", recipeController.getRecipeById);
router.get("/:id/edit", auth, recipeController.getEditRecipeForm);
router.put("/:id", auth, recipeController.updateRecipe);
router.delete("/:id", auth, recipeController.deleteRecipe);

module.exports = router;
