const express = require("express");
const router = express.Router();
const categoryRouter = require("./categoryRoute");
const productRouter = require("./productRoute");

router.use("/products", productRouter);

router.use("/categories", categoryRouter);

module.exports = router