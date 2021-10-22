const mongoose = require("mongoose");

const OrganInjectionRegisterSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.ObjectId,
    },
    userPhone: {
      type: Array,
    },
    healthOrganizationId: {
      type: mongoose.Schema.ObjectId,
    },
    vaccineId: {
      type: Number,
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
