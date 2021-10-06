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
      type: String,
    },
    vaccineId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ScheduleInjection", ScheduleInjectionSchema);
