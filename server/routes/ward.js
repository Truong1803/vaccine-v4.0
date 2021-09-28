const wardCtr = require("../controller/wardCtrl");

const router = require("express").Router();

router.get("/:id1/:id2/:id3", wardCtr.getById);

module.exports = router;
