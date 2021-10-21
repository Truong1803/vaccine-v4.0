const mongoose = require("mongoose");

const HealthOrganizationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
      default: "123456",
    },
    organization: {
      type: String,
    },
    represent: {
      type: String,
    },
    phonenumber: {
      type: String,
    },
    province: {
      type: Object,
    },
    district: {
      type: Object,
    },
    ward: {
      type: Object,
    },
    address: {
      type: String,
    },
    num_table: {
      type: Number,
    },
    role: {
      type: Number,
      enum: [2, 3, 4, 5, 6],
      default: 2,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthOrganization", HealthOrganizationSchema);
