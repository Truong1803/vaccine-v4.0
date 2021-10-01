const vaccineCtrl = require("../controller/vaccineCtrl");
const authTP = require("../middleware/authTP");
const auth = require("../middleware/auth");
const router = require("express").Router();

/**
 * lấy thông tin vắc xin qua id
 */
router.get("/:id", vaccineCtrl.getById);
/**
 * tạo mới 1 loại vắc xin (tỉnh / TP)
 */
router.post("/", auth, authTP, vaccineCtrl.createItem);
/**
 * xoá 1 vắc xin (tỉnh/tp)
 */
router.delete("/:id", auth, authTP, vaccineCtrl.delete);
/**
 * cập nhật thông tin vắc xin qua id (tỉnh/tp)
 */
router.put("/:id", auth, authTP, vaccineCtrl.update);
/**
 * lấy thông tin của tất cả vaccine (tỉnh/tp)
 */
router.get("/", vaccineCtrl.getAll);
module.exports = router;
