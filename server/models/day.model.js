const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const daySchema = new mongoose.Schema(
  {
    dayId: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
    },
    dayName: {
        type: String,
    },
    number: {
        type: Number,
    },
    debts: [{
        type: ObjectId, ref: 'debtItem',
    }],
    credits: [{
        type: ObjectId, ref: 'creditItem'
    }],
    accumulatedDebt: {
        type: Number,
    },
    accumulatedCredit: {
        type: Number,
    },
    targets: [{
        type: Object
    }],
    holders: [{
        type: ObjectId, ref: 'User'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Day", daySchema);
