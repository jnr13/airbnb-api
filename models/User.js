const mongoose = require("mongoose");

const User = new mongoose.model("User", {
  account: {
    username: String,
    biography: String
  },
  email: String,
  token: String,
  hash: String,
  salt: String
});

module.exports = User;
