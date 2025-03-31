const Recipe = require("../models/Recipe");
const Comment = require("../models/Comment");

// Add a comment
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).send("Recipe not found");

    const newComment = new Comment({
      text,
      user: req.user._id,
      recipe: recipe._id,
    });

    await newComment.save();
    recipe.comments.push(newComment._id);
    await recipe.save();

    //TODO: Finish the PAGE
  } catch (error) {
    res.status(500).send("Error adding comment");
  }
};

// Show edit form for a comment
exports.getEditCommentForm = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment || comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).send("Unauthorized");
    }
    //TODO: Finish the PAGE
  } catch (error) {
    res.status(500).send("Error fetching comment");
  }
};

// Edit a comment
exports.updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.findById(req.params.commentId);

    if (!comment || comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).send("Unauthorized");
    }

    comment.text = text;
    await comment.save();
    //TODO: Finish the PAGE
  } catch (error) {
    res.status(500).send("Error updating comment");
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment || comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).send("Unauthorized");
    }

    await comment.deleteOne();
    await Recipe.findByIdAndUpdate(comment.recipe, {
      $pull: { comments: comment._id },
    });

    //TODO: Finish the PAGE
  } catch (error) {
    res.status(500).send("Error deleting comment");
  }
};
