const express = require("express");
const { tokenValidator } = require("../middleware/user-auth");
const router = express.Router();

const {
  editUser,
  getAllUsers,
  getUserById,
  addUser,
  favouriteRecipeAdd,
  deleteFavouriteUser,
  favRecipesUser,
} = require("../controllers/userController");
const { likeRecipe } = require("../controllers/recipeController");

router.get("/user", getAllUsers);
router.post("/user/", addUser);
router.get("/user/favorite", tokenValidator, favRecipesUser);
router.patch("/user/:id/", tokenValidator, editUser);
router.get("/user/:id", getUserById);
router.post("/user/:idRecipes", tokenValidator, favouriteRecipeAdd);
router.delete("/user/:idRecipes", tokenValidator, deleteFavouriteUser);

module.exports = router;
