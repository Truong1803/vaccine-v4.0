const router = require("express").Router();
const userCtrl = require("../controller/user");
const auth = require("../middleware/auth");
/**
 * lấy thông tin user qua id
 */
router.get("/:id", auth, userCtrl.getById);
/**
 * lấy tất cả thông tin user
 */
router.get("/", auth, userCtrl.getAll);
/**
 * tạo mới 1 tài khoản người đân
 */
router.post("/", auth, userCtrl.createUser);
/**
 * cập nhật thông tin người dân qua id
 */
router.put("/:id", auth, userCtrl.updateUser);
/**
 * xoá 1 người dân qua id
 */
router.delete("/:id", auth, userCtrl.deleteUser);
module.exports = router;
