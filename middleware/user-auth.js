const jwt = require("jsonwebtoken");

const tokenValidator = async (req, res, next) => {
  const token = req.header("user-auth");
  if (!token) return res.status(401).send("Acceso denegado");
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.payload = payload;
    next();
  } catch (error) {
    try {
      const payload = jwt.verify(token, process.env.REFRESH_TOKEN);
      req.payload = payload;
      next();
    } catch (error) {
      res.status(400).send("Token caducado o no válido");
    }
  }
};

const adminValidator = (req, res, next) => {
  try {
    const payload = req.payload;
    if (payload.role !== "admin") {
      return res.status(401).send("Acceso denegado");
    }
    next();
  } catch (error) {
    res.status(400).send("Token caducado o no válido");
  }
};

module.exports = { tokenValidator, adminValidator };
