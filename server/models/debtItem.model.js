const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const debtItemSchema = new mongoose.Schema(
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
        type: ObjectId,
    },
    account: {
        type: String,
    },
    userData: {
        type: ObjectId, ref: 'UserData'
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DebtItem", debtItemSchema);
