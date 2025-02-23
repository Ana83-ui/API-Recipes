const mongoose = require("mongoose");

const urlDB = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(urlDB);
    console.log("La conexión a MongoDB ha sido exitosa");
  } catch (err) {
    console.log("No se ha podido conectar con mongo", err);
  }
};

module.exports = connectDB;
