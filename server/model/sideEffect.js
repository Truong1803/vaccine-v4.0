const mongoose = require("mongoose");

const SideEffectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SideEffect", SideEffectSchema);
