const reportCtrl = require("../controller/report/reportCtrl");

const router = require("express").Router();
const authDVT = require("../middleware/authDVT");
const authQH = require("../middleware/authQH");
const authTP = require("../middleware/authTP");
const auth = require("../middleware/auth");
router.get("/report-top-data", reportCtrl.getTopData);
router.get(
  "/report-injection-organ-chart",
  reportCtrl.getDataInjectionOrganChart
);
router.get("/report-injection-organ", reportCtrl.getDataInjectionOrgan);
router.get("/report-injection-age", reportCtrl.getDateInjectionWithAge);
router.get("/report-ward", auth, authDVT, reportCtrl.getDateInjectionForWard);
router.get(
  "/report-district",
  auth,
  authQH,
  reportCtrl.getDateInjectionForDistrict
);
router.get(
  "/report-province",
  auth,
  authTP,
  reportCtrl.getDateInjectionForProvince
);
module.exports = router;
