const reportCtrl = require("../controller/report/reportCtrl");

const router = require("express").Router();

router.get("/report-top-data", reportCtrl.getTopData);

module.exports = router;
