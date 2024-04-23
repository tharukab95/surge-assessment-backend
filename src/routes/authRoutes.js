const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");

router.post("/login", authController.login);

router.post("/register", authController.register);

router.get("/refresh", authController.handleRefreshToken);

module.exports = router;
