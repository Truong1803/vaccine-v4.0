const router = require("express").Router();
const OrganInjectionRegisterCtrl = require("../controller/Injection_Register/organInjectionRegister");
const multer = require("multer");
const auth = require("../middleware/auth");
const authCTY = require("../middleware/authCTY");
const authDVT = require("../middleware/authDVT");
const upload = multer({ dest: "./public/data/uploads/" });
router.post(
  "/",
  upload.single("file"),
  auth,
  authCTY,
  OrganInjectionRegisterCtrl.registerInjection
);

router.patch(
  "/deleteUser",
  auth,
  authCTY,
  OrganInjectionRegisterCtrl.deleteUserRegister
);

router.patch(
  "/addUser",
  auth,
  authCTY,
  OrganInjectionRegisterCtrl.addUserRegister
);

router.get("/", auth, authDVT, OrganInjectionRegisterCtrl.getListOrganRegister);

router.get(
  "/organ/:id",
  auth,
  authCTY,
  OrganInjectionRegisterCtrl.getByIdOrgan
);

router.get("/:id", auth, authDVT, OrganInjectionRegisterCtrl.getById);

module.exports = router;
