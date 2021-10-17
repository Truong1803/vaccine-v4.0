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
    email: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default: "",
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
      default: "",
    },
    role: {
      type: Number,
      default: 1,
    },
    organizationId: {
      type: mongoose.Schema.ObjectId,
    },
    bhyt: {
      type: String,
      default: "",
    },
    job: {
      type: String,
      default: "",
    },
    company: {
      type: String,
      default: "",
    },
    // record
    doseInformation: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
