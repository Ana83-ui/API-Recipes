const express = require("express");
const recipeRouter = require("./routes/recipeRoute");
const userRouter = require("./routes/userRoute");
const loginRouter = require("./routes/loginRouter");
require("dotenv").config();
const urlDB = require("./database/db");

const app = express();

app.use(express.json()), urlDB();

app.use("/api", recipeRouter);
app.use("/api", userRouter);
app.use("/api", loginRouter);

app.listen(3000, () => {
  console.log("Escuchando servidor en puerto http://localhost:3000");
});
