const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const creditItemSchema = new mongoose.Schema(
  {
    creditId: {
        type: String,
        required: true,
        unique: true,
    },
    day: {
        type: Number,
    },
    month: {
        type: Number,
    },
    year: {
        type: Number,
    },
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
