const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const DebtItem = require("../models/debtItem.model");

const familySchema = new mongoose.Schema(
  {
    familyId: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    years: [{
        type: ObjectId, ref: 'Year'
    }],
    debtItems: [{
        type: ObjectId, ref: 'DebtItem'
    }],
    creditItems: [{
        type: ObjectId, ref: 'CreditItem'
    }],
    investmentItems: [{
        type: ObjectId, ref: 'InvestmentItem'
    }],  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Family", familySchema);
