const router = require("express").Router();
const OrganInjectionRegisterCtrl = require("../controller/Injection_Register/organInjectionRegister");
const multer = require("multer");
const upload = multer({ dest: "./public/data/uploads/" });
router.post(
  "/",
  upload.single("file"),
  OrganInjectionRegisterCtrl.registerInjection
);

module.exports = router;
