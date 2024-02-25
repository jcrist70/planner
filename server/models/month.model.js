const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const monthSchema = new mongoose.Schema(
  {
    monthId: {
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
    days: {
        type: Number,
    },
    // {index: 4, label: 'Thursday'}
    firstDay: {
        type: Object,
    },
    accumulatedDebt: {
        type: Number,
    },
    accumulatedCredit: {
        type: Number,
    },
    weeks: [{
        type: ObjectId, ref: 'Week',
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

module.exports = mongoose.model("Month", monthSchema);