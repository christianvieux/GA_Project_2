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

LikeSchema.index({ user: 1, recipe: 1 }, { unique: true });

module.exports = mongoose.model("Like", LikeSchema);