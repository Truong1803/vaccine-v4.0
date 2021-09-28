const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    districtId: {
      type: Number,
    },
    wardId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ward', wardSchema);
