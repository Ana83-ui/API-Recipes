const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {sendEmail} = require("../mensajeria/email");

const signup = async (req, res) => {
  try {
    const { name, email, password, role, favouriteRecipes } = req.body;
    const newUser = {
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
      favouriteRecipes,
    };

    await UserModel.create(newUser);
    await sendEmail(email);
    res.status(200).send("El usuario se ha creado correctamente");
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(500)
        .send({
          status: "Failed",
          error: "El usuario ya existe en la base de datos",
        });
    }
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send("Credenciales no válidas");
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(404).send("Credenciales no válidas");
    }
    const payload = {
      _id: user._id,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.REFRESH_TOKEN, {
      expiresIn: "15 min",
    });
    const tokenRefresh = jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "60 min",
    });

    res.status(200).send({ user, token, tokenRefresh });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const tokenToRefresh = async (req, res) => {
  try {
    const payload = {
      _id: req.payload._id,
      name: req.payload.name,
      role: req.payload.role,
    };

    const token = jwt.sign(payload, process.env.REFRESH_TOKEN, {
      expiresIn: "15 min",
    });
    const tokenRefresh = jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "60 min",
    });

    res.status(200).send(token, tokenRefresh);
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = { signup, login, tokenToRefresh };
