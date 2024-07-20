const express = require("express");
const router = express.Router();
const categoryRouter = require("./categoryRoute");
router.use("/categories", categoryRouter);

module.exports = router