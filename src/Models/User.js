const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: { type: String, unique: true },
  salt: String,
  hash: String,
  account: {
    username: { type: String, required: true },
  },
});

module.exports = User;
