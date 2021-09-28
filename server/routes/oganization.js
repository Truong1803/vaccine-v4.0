const router = require("express").Router();
const organizationCtrl = require("../controller/oganization");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
router.get("/:id", auth, organizationCtrl.getById);
router.get("/", auth, organizationCtrl.getAll);
router.post("/", auth, organizationCtrl.createOrgan);
router.put("/:id", auth, organizationCtrl.updateOrgan);
router.post("/ward", auth, organizationCtrl.createOrganWard);
router.put("/ward/:id", auth, organizationCtrl.updateOrganWard);
router.delete("/:id", auth, organizationCtrl.deleteOrgan);
router.patch("/admin/:id", auth, authAdmin, organizationCtrl.updateAdmin);
router.post("/admin", auth, authAdmin, organizationCtrl.createAdmin);
module.exports = router;
