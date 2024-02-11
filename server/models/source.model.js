const mongoose = require("mongoose");

const sourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
    },
    employee: {
      type: ObjectId, ref: 'User',
    },
    location: {
      type: String,
    },
    distance: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    accumulatedIncome: {
      type: Number,
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

module.exports = mongoose.model("Source", sourceSchema);
