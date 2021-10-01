const mongoose = require("mongoose");

const DeseaseSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    diseaseName: {
      type: String,
    },
  },
  { timestamps: true, _id: false }
);
DeseaseSchema.plugin(AutoIncrement);
module.exports = mongoose.model("Desease", DeseaseSchema);
