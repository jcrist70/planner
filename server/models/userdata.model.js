const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userDataSchema = new mongoose.Schema(
  {
    userDataId: {
      type: String,
      required: true,
      unique: true,
    },
    // store family name iff family data
    isFamilyData: {
      type: String,
    },
    lastUpdated: {
      type: Date,
    },
    years: [{
      type: String,
    }],
    months: [{
      type: String,
    }],
    weeks: [{
      type: String
    }],
    users: [{
      type: ObjectId, ref: 'User'
    }],
    summary: {
      type: ObjectId, ref: 'Summary'
    },
    credits: [{
      type: ObjectId, ref: 'CreditItem'
    }],
    debts: [{
      type: ObjectId, ref: 'DebtItem'
    }],
    investments: [{
      type: ObjectId, ref: 'InvestmentItem'
    }],
    totalCredit: {
      type: Number,
    },
    totalDebit: {
      type: Number,
    }, 
    totalInvestment: {
      type: Number,
    },
    totalCreditCard: {
      type: Number,
    },
    createdOn: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserData", userDataSchema);
