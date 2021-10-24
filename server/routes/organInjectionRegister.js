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

router.get("/", auth, authDVT, OrganInjectionRegisterCtrl.getListOrganRegister);

router.get("/:id", auth, authDVT, OrganInjectionRegisterCtrl.getById);
module.exports = router;
