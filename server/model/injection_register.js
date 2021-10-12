const mongoose = require("mongoose");

const InjectionRegisterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
    },
    healthOrganizationId: {
      type: mongoose.Schema.ObjectId,
    },
    dose: {
      type: Number,
    },
    injectionDate: {
      type: String,
    },
    vaccineId: {
      type: Number,
    },
    diseaseId: {
      type: Array,
      default: [],
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
module.exports = mongoose.model("InjectionRegister", InjectionRegisterSchema);
