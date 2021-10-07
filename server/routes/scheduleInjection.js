const router = require("express").Router();
const ScheduleInjectionCtrl = require("../controller/scheduleInjection");
const auth = require("../middleware/auth");

router.get("/:injectionDate", auth, ScheduleInjectionCtrl.getByDate);

router.post("/", auth, ScheduleInjectionCtrl.setScheduleInjection);

module.exports = router;
