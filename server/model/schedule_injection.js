const mongoose = require("mongoose");

const ScheduleInjectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
    },
    injectionDate: {
      type: String,
    },
    injectionTime: {
      type: String,
    },
    healthOrganizationId: {
      type: mongoose.Schema.ObjectId,
    },
    vaccineId: {
      type: Number,
    },
    status: {
      type: String,
      default: "success",
    },
    time: {
      type: String,
    },
    dose: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ScheduleInjection", ScheduleInjectionSchema);
