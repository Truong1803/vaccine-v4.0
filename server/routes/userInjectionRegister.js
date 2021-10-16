const router = require("express").Router();
const UserInjectionRegisterCtrl = require("../controller/Injection_Register/userInjectionRegister");
const auth = require("../middleware/auth");
const authDVT = require("../middleware/authDVT");
router.get(
  "/getAll",
  auth,
  authDVT,
  UserInjectionRegisterCtrl.getAllInjectionRegister
);
router.get("/:id", auth, UserInjectionRegisterCtrl.getInjectionRegister);

router.post("/", auth, UserInjectionRegisterCtrl.InjectionRegister);

router.delete("/:id", auth, UserInjectionRegisterCtrl.deleteInjectionRegister);

module.exports = router;
