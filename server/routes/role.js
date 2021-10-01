const router = require("express").Router();
const roleCtrl = require("../controller/roleCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
/**
 * lấy thông tin quyền qua id (điều kiện phải là admin)
 */
router.get("/:id", auth, authAdmin, roleCtrl.getById);
/**
 * lấy thông tin tất cả các quyền (admin)
 */
router.get("/", auth, authAdmin, roleCtrl.getAll);
/**
 * tạo mới 1 quyền (admin)
 */
router.post("/", auth, authAdmin, roleCtrl.createRole);
/**
 * cập nhật 1 quyền (admin)
 */
router.put("/:id", auth, authAdmin, roleCtrl.updateRole);
/**
 * xoá quyền (admin)
 */
router.delete("/:id", auth, authAdmin, roleCtrl.deleteRole);
module.exports = router;
