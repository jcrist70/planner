const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const accountSchema = new mongoose.Schema(
  {
    accountId: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
    },
    institution: {
        type: Object,
    },
    ballance: {
        type: Number,
    },
    transactions: [{
        type: Object,
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

module.exports = mongoose.model("Account", accountSchema);
