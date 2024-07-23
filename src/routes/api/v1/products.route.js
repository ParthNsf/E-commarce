const express = require("express");
const { productsControler } = require("../../../controler");
const upload = require("../../../middlewere/upload");

const app = express();
const router = express.Router();

router.get("/list-products", productsControler.listproducts);

router.post(
  "/add-products",
  upload.single("product_img"),
  productsControler.addproducts
);

router.put(
  "/update-products/:product_id",
  upload.single("product_img"),
  productsControler.updateproducts
);

router.delete("/delete-products/:product_id", productsControler.deleteproducts);

router.get(
  "/count-categories",

  productsControler.countcategory
);

module.exports = router;
