const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
