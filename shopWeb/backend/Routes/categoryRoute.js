const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");

router.post("/addCategory", categoryController.CreateCategory);

router.get("/", categoryController.getCategories);

router.delete("/deleteCategory/:id", categoryController.deleteCategory);

router.put("/updateCategory/:id", categoryController.updateCategory);
module.exports = router;
