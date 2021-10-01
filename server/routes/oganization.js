const router = require("express").Router();
const organizationCtrl = require("../controller/oganization");
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
/**
 * Tạo cơ sở quận huyện
 */
router.post("/", auth, organizationCtrl.createOrgan);
/**
 * update sở y tế quận huyện
 */
router.put("/:id", auth, organizationCtrl.updateOrgan);
/**
 * tạo cơ sở tiêm chủng
 */
router.post("/ward", auth, organizationCtrl.createOrganWard);
/**
 * update cơ sở tiêm chủng theo id
 */
router.put("/ward/:id", auth, organizationCtrl.updateOrganWard);
/**
 * xoá một tổ chức
 */
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
