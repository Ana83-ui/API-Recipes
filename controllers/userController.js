const mongoose = require("mongoose");
const UserModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const idUser = req.params.id;
    const user = await UserModel.findById(idUser);
    if (!user) {
      return res.status(400).send("Usuario no encontrado");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const user = req.body;
    await UserModel.create(user);
    res.status(200).send("El usuario se ha registrado correctamente");
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const idUser = req.params.id;
    const newUser = req.body;
    const user = await UserModel.findByIdAndUpdate(idUser, newUser, {
      new: true,
    });
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const favRecipesUser = async (req, res) => {
  try {
    const userId = req.payload._id;

    const user = await UserModel.findById(userId).populate("favouriteRecipes");

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    res.status(200).json(user.favouriteRecipes);
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const favouriteRecipeAdd = async (req, res) => {
  try {
    const { idRecipes } = req.params;
    console.log(idRecipes);
    const idUser = req.payload._id;
    console.log(idUser);
    if (!idUser) {
      return res.status(200).send("Usuario no encontrado");
    }
    const user = await UserModel.findById(idUser);
    const isIncluded = user.favouriteRecipes.includes(idRecipes);
    if (isIncluded) {
      return res.status(200).send("Receta ya en favoritos");
    }
    user.favouriteRecipes.push(idRecipes);
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message }); // error: error.message nos dice cual es el error
  }
};

const deleteFavouriteUser = async (req, res) => {
  try {
    const { idRecipes } = req.params;
    const idUser = req.payload._id;
    if (!idUser) {
      return res.status(200).send("Usuario no encontrado");
    }
    const user = await UserModel.findById(idUser);
    const isIncluded = user.favouriteRecipes.includes(idRecipes);
    if (!isIncluded) {
      return res.status(200).send("Receta no encontrada");
    }
    user.favouriteRecipes = user.favouriteRecipes.filter(
      (id) => id.toString() !== idRecipes
    );
    user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = {
  editUser,
  getAllUsers,
  getUserById,
  addUser,
  favouriteRecipeAdd,
  deleteFavouriteUser,
  favRecipesUser,
};
