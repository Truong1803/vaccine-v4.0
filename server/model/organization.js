const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema(
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

    role: {
      type: Number,
      default: 2,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", OrganizationSchema);
