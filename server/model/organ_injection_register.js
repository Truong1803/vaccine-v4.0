const mongoose = require("mongoose");

const OrganInjectionRegisterSchema = new mongoose.Schema(
  {
    organizationId: {
      type: String,
    },
    userId: {
      type: Array,
    },
    dose: {
      type: number,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "OrganInjectionRegister",
  OrganInjectionRegisterSchema
);
