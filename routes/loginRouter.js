const express = require("express");
const {
  signup,
  login,
  tokenToRefresh,
} = require("../controllers/loginController");
const { tokenValidator, adminValidator } = require("../middleware/user-auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/refresh", tokenToRefresh);

module.exports = router;
