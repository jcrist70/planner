const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const yearSchema = new mongoose.Schema(
  {
    yearId: {
        type: String,
        required: true,
        unique: true,
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
    months: [{
        type: ObjectId, ref: 'Month',
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

module.exports = mongoose.model("Year", yearSchema);
