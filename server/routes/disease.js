const router = require("express").Router();
const deseaseCtrl = require("../controller/diseaseCtrl");
router.get("/:id", deseaseCtrl.getById);
router.get("/", deseaseCtrl.getAll);
router.post("/", deseaseCtrl.createDisease);
router.put("/:id", deseaseCtrl.updateDisease);
router.delete("/:id", deseaseCtrl.deleteDisease);
module.exports = router;
