const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const debtItemSchema = new mongoose.Schema(
  {
    debtId: {
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
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    item: {
        type: String,
        required: true,
        index: true,
    },
    price: {
        type: Number,
    },
    cycle: {
        type: String,
    },
    frequency: {
        type: Number,
    },
    supplier: {
        type: ObjectId, ref: 'Supplier',
    },
    account: {
        type: String,
    },
    users: [{
        type: ObjectId, ref: 'User'
      }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("DebtItem", debtItemSchema);
