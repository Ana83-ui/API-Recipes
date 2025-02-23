const mongoose = require("mongoose");
const RecipeModel = require("../models/recipeModel");
const commentsModel = require("../models/commentsModel");

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.find().populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "name",
      },
    });

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Failed", error: error.message });
  }
};

const getRecipesById = async (req, res) => {
  try {
    const idRecipe = req.params.id;
    const recipe = await RecipeModel.findById(idRecipe);
    if (!recipe) {
      return res.status(400).send("Receta no encontrada");
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const getRecentRecipe = async (req, res) => {
  try {
    const recipe = await RecipeModel.find({})
      .sort({ creationDate: -1 })
      .limit(5);
    if (!recipe.length) {
      return res.status(404).send("Recetas no encontradas");
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const popularRecipe = async (req, res) => {
  
    try {
      const recipes = await RecipeModel.aggregate([
        {
          $project: {
            title: 1,
            description: 1,
            ingredients: 1, 
            category: 1,
            imageURL: 1,
            difficulty: 1,
            likesCount: { $size: "$likes" },
          },
        },
        {
          $sort: { likesCount: -1 },
        },
        {
          $limit: 5,
        },
      ]);

      if (!recipes || recipes.length === 0) {
        return res.status(400).send("No se encontraron recetas populares");
      }

      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).send({ status: "Failed", error: error.message });
    }
  };

const addRecipe = async (req, res) => {
  try {
    const recipe = req.body;
    await RecipeModel.create(recipe);
    res.status(200).send("La receta se ha creado correctamente)");
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const editRecipe = async (req, res) => {
  try {
    const idRecipe = req.params.id;
    const newRecipe = req.body;
    const recipe = await RecipeModel.findByIdAndUpdate(idRecipe, newRecipe, {
      new: true,
    });
    if (!recipe) {
      return res.status(404).send("Receta no encontrado");
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const idRecipe = req.params.id;
    const recipe = await RecipeModel.findByIdAndDelete(idRecipe);
    if (!recipe) {
      return res.status(404).send("Receta eliminada");
    }
    res.status(200).send("Se ha eliminado correctamente la receta");
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const likeRecipe = async (req, res) => {
  try {
    const idRecipes = req.params.idRecipes;

    const userId = req.payload._id;

    const user = await RecipeModel.findByIdAndUpdate(
      idRecipes,
      { $push: { likes: userId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }
    const likesCount = user.likes.length;
    if (likesCount) {
      return res.status(200).send("La receta ya tiene un like");
    }
    res.status(200).json(userId), likesCount;
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const deleteLike = async (req, res) => {
  try {
    const { idRecipes } = req.params;
    const idUser = req.payload._id;
    if (!idUser) {
      return res.status(400).send("Usuario no encontrado");
    }

    const recipe = await RecipeModel.findById(idRecipes);
    if (!recipe) {
      return res.status(404).send("Receta no encontrada");
    }

    const isLikedByUser = recipe.likes.includes(idUser);
    if (!isLikedByUser) {
      return res.status(400).send("No has dado like a esta receta");
    }

    recipe.likes = recipe.likes.filter((userId) => userId !== idUser);

    await recipe.save();

    res.status(200).json({
      message: "Like eliminado correctamente",
      likesCount: recipe.likes.length,
    });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const filterCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const recipes = await RecipeModel.find({ category: category });

    if (recipes.length === 0) {
      return res
        .status(404)
        .send("No se encontraron recetas en esta categoría");
    }

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const comments = async (req, res) => {
  const { comment, rating } = req.body;
  const recetaId = req.params.idRecipes;
  const userId = req.userId;

  try {
    const receta = await RecipeModel.findById(recetaId);
    if (!receta) {
      return res.status(404).json({ mensaje: "Receta no encontrada" });
    }

    const nuevoComentario = new commentsModel({
      comment,
      userId,
      rating,
    });

    await nuevoComentario.save();

    receta.comments.push(nuevoComentario._id);

    await receta.save();

    res.status(201).json({ mensaje: "Comentario agregado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al agregar el comentario" });
  }
};

module.exports = {
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
};
