const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const creditItemSchema = new mongoose.Schema(
  {
    type: {
        type: String,
    },
    date: {
        type: Date,
    },
    item: {
        type: String,
        required: true,
        index: true,
    },
    amount: {
        type: Number,
    },
    cycle: {
        type: String,
    },
    frequency: {
        type: Number,
    },
    source: {
        type: ObjectId, ref: 'Source',
    },
    account: {
        type: String,
    },
    user: {
        type: ObjectId, ref: 'User'
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CreditItem", creditItemSchema);
