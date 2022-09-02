const mongoose = require("mongoose");
const connect = require("./dbconnector");
connect("connected to user database");

const userSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
    min: 3,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },

  Passport: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  Password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
