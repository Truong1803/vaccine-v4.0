const router = require("express").Router();
const auth = require("../middleware/auth");
const InjectionInforCtrl = require("../controller/InjectionInfor/injection_infor");

router.get("/pre-injection", auth, InjectionInforCtrl.getPreInjection);
router.get("/post-injection", auth, InjectionInforCtrl.getPostInjection);

router.patch("/pre-injection/:id", auth, InjectionInforCtrl.updatePreInjection);

router.patch(
  "/post-injection/:id",
  auth,
  InjectionInforCtrl.updatePostInjection
);

module.exports = router;
