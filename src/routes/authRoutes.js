const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const userAuth = require("../middlewares/userAuth.js");

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/refresh", authController.handleRefreshToken);

module.exports = router;
