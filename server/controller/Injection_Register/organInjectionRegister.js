const OrganInjectionRegister = require("../../model/organ_injection_register");
const HealthOrganization = require("../../model/healthOrganization");
const Vaccine = require("../../model/vaccine");
const multer = require("multer");
const upload = multer({ dest: "./public/data/uploads/" });
const OrganInjectionRegisterCtrl = {};

module.exports = OrganInjectionRegisterCtrl;
