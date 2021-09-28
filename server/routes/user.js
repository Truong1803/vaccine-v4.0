const router = require("express").Router();
const userCtrl = require("../controller/user");
const auth = require("../middleware/auth");
router.get("/:id", auth, userCtrl.getById);
router.get("/", auth, userCtrl.getAll);
router.post("/", auth, userCtrl.createUser);
router.put("/:id", auth, userCtrl.updateUser);
router.delete("/:id", auth, userCtrl.deleteUser);
module.exports = router;
