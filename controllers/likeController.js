const Recipe = require("../models/Recipe");

// Like a recipe
exports.likeRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).send("Recipe not found");

        if (!recipe.likes.includes(req.user._id)) {
            recipe.likes.push(req.user._id);
            await recipe.save();
        }
        //TODO: Finish the PAGE
    } catch (error) {
        res.status(500).send("Error liking recipe");
    }
};

// Unlike a recipe
exports.unlikeRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).send("Recipe not found");

        recipe.likes = recipe.likes.filter(
            (userId) => userId.toString() !== req.user._id.toString()
        );
        await recipe.save();
        //TODO: Finish the PAGE
    } catch (error) {
        res.status(500).send("Error unliking recipe");
    }
};
