const reportCtrl = require("../controller/report/reportCtrl");

const router = require("express").Router();

router.get("/report-top-data", reportCtrl.getTopData);
router.get("/report-injection-organ", reportCtrl.getDataInjectionOrgan);
module.exports = router;
