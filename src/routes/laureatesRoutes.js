const express = require("express");
const router = express.Router();
const laureatesController = require("../controllers/laureatesController.js");
const { verifyJWT } = require("../middlewares/verifyJwt.js");

router.get("/laureates", verifyJWT, laureatesController.getLaureates);

module.exports = router;
