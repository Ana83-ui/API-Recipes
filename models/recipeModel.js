const mongoose = require("mongoose");
const schema = mongoose.Schema;

const recipeSchema = new schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  ingredients: {
    type: String,
    require: true,
  },
  category: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  difficulty: {
    type: String,
    enum: ["fácil", "medio", "difícil"],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],

  creationDate: {
    type: Date,
    default: Date.now,
  },
});

const recipeModel = mongoose.model("Recipes", recipeSchema, "recipes");

module.exports = recipeModel;
