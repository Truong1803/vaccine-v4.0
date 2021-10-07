const router = require("express").Router();
const UserInjectionRegisterCtrl = require("../controller/userInjectionRegister");
const auth = require("../middleware/auth");

router.get("/", auth, UserInjectionRegisterCtrl.getInjectionRegister);

router.post("/", auth, UserInjectionRegisterCtrl.InjectionRegister);

router.delete("/:id", auth, UserInjectionRegisterCtrl.deleteInjectionRegister);

module.exports = router;
