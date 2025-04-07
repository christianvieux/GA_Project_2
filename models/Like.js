// models/Like.js
const mongoose = require("mongoose");
const LikeSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  recipe: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Recipe", 
    required: true 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  }
});

LikeSchema.index({ user: 1, recipe: 1 }, { unique: true }); // * This ensures that a user can only like a specific recipe once, * preventing duplicate likes from the same user on the same recipe.

module.exports = mongoose.model("Like", LikeSchema);