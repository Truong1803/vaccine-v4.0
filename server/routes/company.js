const router = require("express").Router();
const organizationCtrl = require("../controller/organization");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
/**
 * lấy thông tin tổ chức theo ID
 */
router.get("/:id", auth, organizationCtrl.getById);
/**
 * lấy danh sách tổ chức theo từng cấp
 */
router.get("/", auth, organizationCtrl.getAll);

router.delete("/:id", auth, organizationCtrl.deleteOrgan);
/**
 * cập nhật các tổ chức theo id (admin)
 */
router.patch("/admin/:id", auth, authAdmin, organizationCtrl.updateAdmin);
/**
 * tạo mói 1 tổ chức (admin)
 */
router.post("/admin", auth, authAdmin, organizationCtrl.createAdmin);
module.exports = router;
