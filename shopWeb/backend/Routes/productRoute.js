const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.post("/addProduct", ProductController.CreateProduct);

router.get("/availableProducts", ProductController.getAvailableProducts);

router.get("/", ProductController.getProducts);

router.get("/singleProduct/:SKU", ProductController.getSingleProduct);

router.delete("/deleteProduct/:id", ProductController.deleteProduct);

router.put("/updateProduct/:id", ProductController.updateProduct);

module.exports = router;
