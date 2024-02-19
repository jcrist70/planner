const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const weekSchema = new mongoose.Schema(
  {
    weekId: {
        type: String,
        required: true,
        unique: true,
    },
    year: {
        type: Number,
    },
    number: {
        type: Number,
    },
    accumulatedDebt: {
        type: Number,
    },
    accumulatedCredit: {
        type: Number,
    },
    days: [{
        type: ObjectId, ref: 'Day',
    }],
    targets: [{
        type: Object
    }],
    holders: [{
        type: ObjectId, ref: 'User'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Week", weekSchema);
