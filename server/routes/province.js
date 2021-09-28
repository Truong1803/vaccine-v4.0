const provinceCtrl = require("../controller/provinceCtrl");

const router = require("express").Router();

router.get("/:id", provinceCtrl.getById);

module.exports = router;
