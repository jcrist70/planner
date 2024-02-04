const mongoose = require("mongoose");

const authUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "user",
    },
    region: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuthorizedUser", authUserSchema);
