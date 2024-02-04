const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    apiKey: String,
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    userData: {
      type: ObjectId, ref: 'UserData'
    },
    emailVerified: {
      type: Boolean,
    },
    loggedIn: {
      type: Boolean,
    },
    lastLoginAt: {
      type: Number,
    },
    role: {
      type: String,
      default: "user",
    },
    refreshToken: {
      type: String,
    },
    accessToken: {
      type: String
    },
    accessTokenPrev: {
      type: String
    },
    expirationTime: {
      type: Number,
    },
    region: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
