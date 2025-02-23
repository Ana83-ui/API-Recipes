const express = require("express");
const { tokenValidator, adminValidator } = require("../middleware/user-auth");
const router = express.Router();

const {
  getAllRecipes,
  getRecipesById,
  getRecentRecipe,
  addRecipe,
  popularRecipe,
  editRecipe,
  deleteRecipe,
  likeRecipe,
  deleteLike,
  filterCategory,
  comments,
} = require("../controllers/recipeController");

router.get("/recipes/", getAllRecipes);
router.post("/recipes/", tokenValidator, adminValidator, addRecipe);
router.get("/recent_recipes", getRecentRecipe);
router.get("/popular_recipes", popularRecipe);
router.get("/recipes/category/:category", filterCategory);
router.get("/recipes/:id", getRecipesById);
router.patch("/recipes/:id", tokenValidator, adminValidator, editRecipe);
router.delete("/recipes/:id", tokenValidator, adminValidator, deleteRecipe);
router.patch("/recipes/:idRecipes/like", tokenValidator, likeRecipe);
router.delete("/recipes/:idRecipes/like", tokenValidator, deleteLike);
router.patch("/recipes/:idRecipes/comments", tokenValidator, comments);

module.exports = router;
