const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phonenumber: {
      type: String,
      required: true,
    },

    identification: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
      required: true,
    },
    province: {
      type: Object,
      required: true,
    },
    district: {
      type: Object,
      required: true,
    },
    ward: {
      type: Object,
      required: true,
    },
    address: {
      type: String,
    },
    role: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
