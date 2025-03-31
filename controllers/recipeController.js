const Recipe = require("../models/Recipe");

// Get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        //TODO: Finish the PAGE
    } catch (error) {
        res.status(500).send("Error fetching recipes");
    }
};

// Show form to create a new recipe
exports.getNewRecipeForm = (req, res) => {
    //TODO: Finish the PAGE
};

// Create a new recipe
exports.createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions } = req.body;
        const newRecipe = new Recipe({ 
            title, 
            ingredients, 
            instructions, 
            user: req.user._id // Assuming authentication middleware adds req.user
        });
        await newRecipe.save();
        //TODO: Finish the PAGE
    } catch (error) {
        res.status(400).send("Error creating recipe");
    }
};

// Show a single recipe
exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate("user");
        if (!recipe) return res.status(404).send("Recipe not found");
        //TODO: Finish the PAGE
    } catch (error) {
        res.status(500).send("Error fetching recipe");
    }
};

// Show edit form for a recipe
exports.getEditRecipeForm = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe || recipe.user.toString() !== req.user._id.toString()) {
            return res.status(403).send("Unauthorized");
        }
        //TODO: Finish the PAGE
    } catch (error) {
        res.status(500).send("Error fetching recipe");
    }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions } = req.body;
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe || recipe.user.toString() !== req.user._id.toString()) {
            return res.status(403).send("Unauthorized");
        }

        recipe.title = title;
        recipe.ingredients = ingredients;
        recipe.instructions = instructions;
        await recipe.save();
        //TODO: Finish the PAGE
    } catch (error) {
        res.status(400).send("Error updating recipe");
    }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe || recipe.user.toString() !== req.user._id.toString()) {
            return res.status(403).send("Unauthorized");
        }

        await Recipe.findByIdAndDelete(req.params.id);
        //TODO: Finish the PAGE
    } catch (error) {
        res.status(500).send("Error deleting recipe");
    }
};
