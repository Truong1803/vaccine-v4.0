const districtCtrl = require("../controller/districtCtrl");

const router = require("express").Router();

router.get("/:id", districtCtrl.getById);

module.exports = router;
