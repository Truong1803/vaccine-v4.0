const router = require("express").Router();
const SideEffectCtrl = require("../controller/SideEffect/sideEffectCtrl");

router.get("/", SideEffectCtrl.getAll);
router.post("/", SideEffectCtrl.create);

module.exports = router;
