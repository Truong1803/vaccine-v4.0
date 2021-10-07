const mongoose = require("mongoose");

const InjectionRegisterSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    healthOrganizationId: {
      type: String,
    },
    dose: {
      type: Number,
    },
    injectionDate: {
      type: String,
    },
    vaccineId: {
      type: String,
    },
    diseaseId: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: "pendding",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("InjectionRegister", InjectionRegisterSchema);
