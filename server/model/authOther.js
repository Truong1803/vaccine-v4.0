const mongoose = require("mongoose");

const authOtherSchema = new mongoose.Schema(
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
      type: String,
    },
    role: {
      type: Number,
      enum: [2, 3, 4, 5],
      default: 2,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuthOthers", authOtherSchema);
