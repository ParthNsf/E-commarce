const express = require("express");
const router = express.Router();

const categoriesRouter  = require("./categories.route");
const subcategorisRouter = require("./subcategories.route");
const productsRouter = require("./products.route");
const varientsRouter = require("./variant.route");
const salsepersonRouter = require("./salespeople.route");
const userrouter = require("./user.route");



router.use("/categories",categoriesRouter);
router.use("/subcategories",subcategorisRouter);
router.use("/products",productsRouter)
router.use("/varients",varientsRouter);
router.use("/salseperson",salsepersonRouter);
router.use("/user",userrouter);


module.exports = router;