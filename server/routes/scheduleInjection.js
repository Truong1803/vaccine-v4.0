const router = require("express").Router();
const ScheduleInjectionCtrl = require("../controller/Injection_Register/scheduleInjection");
const auth = require("../middleware/auth");

router.get("/", auth, ScheduleInjectionCtrl.getAll);

router.post("/", auth, ScheduleInjectionCtrl.setScheduleInjection);

module.exports = router;
