const router = require("express").Router();
const authCtrl = require("../controller/Auth/authCtrl");
/**
 * đăng ký tài khoản người dân bằng sdt
 */
router.post("/register_sms", authCtrl.registerSms);
/**
 * tạo token mới khi token hết hạn
 */
router.get("/refresh_token", authCtrl.refreshToken);
/**
 * đăgn nhập người dân bằng điện thoại
 */
router.post("/login_sms", authCtrl.loginSms);
/**
 * xác thực otp
 */
router.post("/verify_otp", authCtrl.verifyOTP);
/**
 * cập nhật thông tin người dân khi đăng ký
 */
router.post("/update_infor", authCtrl.updateInfor);
/**
 * đăng ký tài khoản 1 tổ chức
 */
router.post("/register_organ", authCtrl.registerOrgan);
/**
 * kích hoạt tài khoản qua email
 */
router.post("/active_email", authCtrl.activeAccount);
/**
 * đăng nhập bằng tài khoản tổ chức
 */
router.post("/login_organ", authCtrl.loginOrgan);
/**
 * đăng xuất
 */
router.get("/logout", authCtrl.logout);
module.exports = router;
