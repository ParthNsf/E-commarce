const express = require("express");
const { subcategoriesControler } = require("../../../controler");

const app = express();
const router = express.Router();

router.get("/list-subcategories", subcategoriesControler.listsubcategories);

router.post("/add-subcategories", subcategoriesControler.addsubcategories);

router.put(
  "/update-subcategories/:subcategory_id",
  subcategoriesControler.updatesubcategories
);

router.delete(
  "/delete-subcategories/:subcategory_id",
  subcategoriesControler.deletesubcategories
);

router.get(
  "/list-subcategories-categories_iD/:category_id",
  subcategoriesControler.listCategoriesID
);

router.get("/countproducts",
  subcategoriesControler.countproducts
)

module.exports = router;
