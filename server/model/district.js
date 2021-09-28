const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    provinceId: {
      type: Number,
    },
    districtId: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("District", districtSchema);
