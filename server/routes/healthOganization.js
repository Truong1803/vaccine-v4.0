const router = require("express").Router();
const healthOganizationCtrl = require("../controller/HealthOrganization/healthOganization");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
/**
 * lấy thông tin tổ chức theo ID
 */
router.get("/:id", auth, healthOganizationCtrl.getById);
/**
 * lấy danh sách tổ chức theo từng cấp
 */
router.get("/", auth, healthOganizationCtrl.getAll);
/**
 * Tạo cơ sở quận huyện
 */
router.post("/", auth, healthOganizationCtrl.createOrgan);
/**
 * update sở y tế quận huyện
 */
router.put("/:id", auth, healthOganizationCtrl.updateOrgan);
/**
 * tạo cơ sở tiêm chủng
 */
router.post("/ward", auth, healthOganizationCtrl.createOrganWard);
/**
 * update cơ sở tiêm chủng theo id
 */
router.put("/ward/:id", auth, healthOganizationCtrl.updateOrganWard);
/**
 * xoá một tổ chức
 */
router.delete("/:id", auth, healthOganizationCtrl.deleteOrgan);
/**
 * cập nhật các tổ chức theo id (admin)
 */
router.patch("/admin/:id", auth, authAdmin, healthOganizationCtrl.updateAdmin);
/**
 * tạo mói 1 tổ chức (admin)
 */
router.post("/admin", healthOganizationCtrl.createAdmin);
module.exports = router;
