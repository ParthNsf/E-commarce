const express = require("express");
const { categoriesControler } = require("../../../controler");
const app = express();
const router = express.Router();

router.get("/list-categories",
    categoriesControler.listcategories
);

router.post("/add-categories",
categoriesControler.addcategories
);

router.put("/update-categories/:category_id",
categoriesControler.updatecategories 
);

router.delete("/delete-categories/:category_id",
    categoriesControler.deletecategories
);

router.get("/countsubcategories",
    categoriesControler.countsubcategory
)


module.exports = router;