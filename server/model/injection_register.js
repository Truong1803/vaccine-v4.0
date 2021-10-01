const mongoose = require("mongoose");

const InjectionRegisterSchema = new mongoose.Schema(
  {
    userId: { type: String },
    vaccinationUnitId: {
      type: { String },
    },
    diseaseId: {
      type: Array,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("InjectionRegister", InjectionRegisterSchema);
