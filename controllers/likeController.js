const Recipe = require("../models/Recipe");

exports.likeRecipe = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const recipe = await Recipe.findById(req.params.recipeId);
        if (!recipe) return res.status(404).send("Recipe not found");

        if (!recipe.likes.includes(userId)) {
            recipe.likes.push(userId);
            await recipe.save();
        }
        res.redirect("back");
    } catch (error) {
        res.status(500).send(`Error liking recipe ${error}`);
    }
};

exports.unlikeRecipe = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const recipe = await Recipe.findById(req.params.recipeId);
        if (!recipe) return res.status(404).send("Recipe not found");

        recipe.likes = recipe.likes.filter(
            (_userId) => _userId.toString() !== userId
        );
        await recipe.save();
        res.redirect("back");
    } catch (error) {
        res.status(500).send("Error unliking recipe");
    }
};
