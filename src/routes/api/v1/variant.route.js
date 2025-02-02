const express = require("express");
const { varientsControler } = require("../../../controler");
const upload = require("../../../middlewere/upload");


const app = express();
const router = express.Router();


router.get("/list-varients",
    varientsControler.listVarients
);

router.get("/list-varients/:varients_id",
    varientsControler.getVarients
);

router.post("/add-varients",
    upload.array("products_img",5),
    varientsControler.addVarients
);

router.put("/update-varients/:varients_id",
    upload.array("products_img",5),
    varientsControler.updateVarients

);

router.delete("/delete-varients/:varients_id",
    varientsControler.deleteVarients
);

module.exports = router;
