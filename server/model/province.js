const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    provinceId: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Province', provinceSchema);
