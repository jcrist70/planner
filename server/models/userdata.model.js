const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userDataSchema = new mongoose.Schema(
  {
    userDataId: {
      type: String,
      required: true,
      unique: true,
    },
    lastUpdated: {
      type: Date,
    },
    year: {
      type: String,
    },
    month: {
      type: String,
    },
    weeks: [
      {type: String}
    ],
    users: [
      {type: ObjectId, ref: 'User'}
    ],
    summary: {
      type: ObjectId, ref: 'Summary'
    },
    credits: {
      type: ObjectId, ref: 'Credits'
    },
    debits: {
      type: ObjectId, ref: 'Debits'
    },
    investments: {
      type: ObjectId, ref: 'Investments'
    },
    totalCredits: {
      type: Number,
    },
    totalDebits: {
      type: Number,
    }, 
    totalInvestments: {
      type: Number,
    },
    totalCreditCards: {
      type: Number,
    },
    createdOn: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserData", userDataSchema);
