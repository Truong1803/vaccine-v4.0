const mongoose = require("mongoose");

const InjectionInforSchema = new mongoose.Schema(
  {
    userId: {
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
    },
    healthOrganizationId: {
      type: String,
    },
    preInjectionReaction: {
      type: Object,
      default: "",
    },
    postInjectionReaction: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InjectionInfor", InjectionInforSchema);
