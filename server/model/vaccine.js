const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const vaccineSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    name_vaccine: {
      type: String,
    },
    production_unit: {
      type: String,
    },
    country: {
      type: String,
    },
    use_obj: {
      type: String,
    },
    time_step: {
      type: String,
    },
    num_ijection: {
      type: String,
    },
  },
  { timestamps: true, _id: false }
);
vaccineSchema.plugin(AutoIncrement);
module.exports = mongoose.model("Vaccines", vaccineSchema);
