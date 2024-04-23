const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController.js");
const { verifyJWT } = require("../middlewares/verifyJwt.js");

router.get("/comments/:laureateId", verifyJWT, commentsController.getComments);

router.post("/comments", verifyJWT, commentsController.addComment);

module.exports = router;
