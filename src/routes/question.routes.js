const express = require("express");
const { addQuestion } = require("../controllers/question.controller");
const router = express.Router();

router.post("/add", addQuestion);

module.exports = router;
