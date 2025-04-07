const Recipe = require("../models/Recipe.js");
const Comment = require("../models/Comment.js");

exports.addComment = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { comment } = req.body;
    const recipe = await Recipe.findById(req.params.recipeId);

    if (!recipe) return res.status(404).send("Recipe not found");

    const newComment = new Comment({
      content: comment,
      author: userId,
      recipe: recipe._id,
    });

    await newComment.save();
    recipe.comments.push(newComment._id); // This method modifies the array of comment IDs in memory, It doesn't really affect the database until you save the recipe.
    await recipe.save();

    res.redirect("back");
  } catch (error) {
    res.status(500).send(`Error adding comment ${error}`);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment || comment.author.toString() !== req.session.user.id) {
      return res.status(403).send("Unauthorized");
    }

    await comment.deleteOne();
    await Recipe.findByIdAndUpdate(comment.recipe, {
      $pull: { comments: comment._id }, // $pull is a MongoDB update operator that removes elements from an array that match specific conditions.

    });

    res.redirect('back');
  } catch (error) {
    res.status(500).send(`Error deleting comment ${error}`);
  }
};
