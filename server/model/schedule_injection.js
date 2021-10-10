const mongoose = require("mongoose");

const ScheduleInjectionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("ScheduleInjection", ScheduleInjectionSchema);
