const mongoose = require("mongoose");

const OrganInjectionRegisterSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.ObjectId,
    },
    userId: {
      type: Array,
    },
    dose: {
      type: Number,
    },
    healthOrganizationId: {
      type: mongoose.Schema.ObjectId,
    },
    vaccineId: {
      type: Number,
    },
    diseaseId: {
      type: Array,
    },
    status: {
      type: String,
      default: "pendding",
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "OrganInjectionRegister",
  OrganInjectionRegisterSchema
);
