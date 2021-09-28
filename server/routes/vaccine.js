const vaccineCtrl = require("../controller/vaccineCtrl");
const authTP = require("../middleware/authTP");
const auth = require("../middleware/auth");
const router = require("express").Router();

router.get("/:id", vaccineCtrl.getById);
router.post("/", auth, authTP, vaccineCtrl.createItem);
router.delete("/:id", auth, authTP, vaccineCtrl.delete);
router.put("/:id", auth, authTP, vaccineCtrl.update);
router.get("/", vaccineCtrl.getAll);
module.exports = router;
