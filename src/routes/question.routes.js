const express = require("express");
const router = express.Router();
const questionController = require("../controllers/question.controller");

router.get("/", questionController.getAllQuestions);
router.get("/:categoryId", questionController.getByCategory);
router.post("/", questionController.createQuestion);

module.exports = router;
