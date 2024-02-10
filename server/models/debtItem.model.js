const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const debtItemSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        index: true,
    },
    type: {
        type: String,
    },
    amount: {
        type: Number,
    },
    account: {
        type: String,
    },
    paymentMethod: {
        type: String,
    },
    date: {
        type: Date,
    },
    reoccurring: {
        type: Boolean,
    },
    frequency: {
        type: ObjectId,
    },
    userData: {
      type: ObjectId, ref: 'UserData'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DebtItem", debtItemSchema);
