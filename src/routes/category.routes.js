const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

// ✅ Category yaratish
router.post("/", async (req, res) => {
  try {
    const category = await categoryController.createCategory(req, res);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Barcha kategoriyalar
router.get("/", categoryController.getAllCategories);

// ✅ Bitta kategoriya
router.get("/:id", categoryController.getCategoryDetail);

module.exports = router;
