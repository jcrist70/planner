const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      index: true,
    },
    value: {
      type: String,
    },
    location: {
      type: String,
    },
    distance: {
      type: String,
    },
    taxes: {
      type: String,
    },
    region: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supplier", supplierSchema);
