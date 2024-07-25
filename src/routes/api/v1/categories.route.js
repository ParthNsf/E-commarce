const express = require("express");
const { categoriesControler } = require("../../../controler");
const auth = require("../../../db/auth");
const app = express();
const router = express.Router();

router.get("/list-categories",
    auth(["admin"]),
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