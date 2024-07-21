const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const upload = require('../middleware/uploadImages');


router.post("/addProduct", upload.array('images', 10), ProductController.CreateProduct);

router.get("/availableProducts", ProductController.getAvailableProducts);

router.get("/", ProductController.getProducts);

router.get("/singleProduct/:SKU", ProductController.getSingleProduct);

router.delete("/deleteProduct/:id", ProductController.deleteProduct);

router.put("/updateProduct/:id", upload.array('images', 10), ProductController.updateProduct);

module.exports = router;
