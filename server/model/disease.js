const mongoose = require("mongoose");
const DeseaseSchema = new mongoose.Schema(
  {
    diseaseName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Desease", DeseaseSchema);
