// models/Recipe.js
const mongoose = require("mongoose");
const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    instructions: {
      type: String,
      required: true,
    },
    cook_time: {
      type: Number,
    },
    image: {
      type: String,
      default: "NO_IMAGE",
    },
    category: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Other"], // The ideal values to be used
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true } // This basically adds timestamps for whenever something gets changed/updated.
);

module.exports = mongoose.model("Recipe", RecipeSchema);
