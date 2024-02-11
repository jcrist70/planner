const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const investmentItemSchema = new mongoose.Schema(
  {
    investmentId: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
    },
    userRating: {
        type: Number,
    },
    service: {
        type: String,
    },
    comapny: {
        type: String,
    },
    priceToEarnings: {
        type: String,
    },
    priceToBook: {
        type: String,
    },
    debtToEquity: {
        type: String,
    },
    dividendYield: {
        type: String,
    },
    dividendPayoutRatio: {
        type: String,
    },
    earningPerShare: {
        type: String,
    },
    profitAfterTax: {
        type: String,
    },
    freeCashFlow: {
        type: String,
    },
    yearOnYearGrowth: {
        type: String,
    },
    profitMargin: {
        type: String,
    },
    priceEarningsToGrowth: {
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
    amount: {
        type: Number,
    },
    cycle: {
        type: String,
    },
    frequency: {
        type: Number,
    },
    accumulatedReturn: {
        type: Number,
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

module.exports = mongoose.model("InvestmentItem", investmentItemSchema);
