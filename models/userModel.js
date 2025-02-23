const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    require: [true, "El mail es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "La contraseña es obligatoria"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  favouriteRecipes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Recipes",
  },
});

const userModel = mongoose.model("User", userSchema, "user");

module.exports = userModel;
