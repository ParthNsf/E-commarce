const express = require("express");
const { salsepersonControler } = require("../../../controler");

const app = express();
const router = express.Router();

router.get("/list-salespeople", salsepersonControler.listsalseperson);

router.post("/add-salespeople", salsepersonControler.addsalseperson);

router.put("/update-salespeople/:SNUM", salsepersonControler.updatesalseperson);

router.delete("/delete-salespeople/:SNUM", salsepersonControler.deletesalseperson);
module.exports = router;
