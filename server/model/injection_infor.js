const mongoose = require("mongoose");

const InjectionInforSchema = new mongoose.Schema(
  {
    userId: {
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
    time: {
      type: String,
    },
    healthOrganizationId: {
      type: mongoose.Schema.ObjectId,
    },
    preInjectionReaction: {
      type: Object,
      default: "",
    },
    postInjectionReaction: {
      type: Object,
      default: "",
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InjectionInfor", InjectionInforSchema);
