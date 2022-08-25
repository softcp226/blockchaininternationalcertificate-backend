const mongoose = require("mongoose");
const connect = require("./dbconnector");
connect("connected to deposit database");
require("./user");
const depositSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  purpose_of_deposit: {
    type: String,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
});
const Deposit = mongoose.model("deposit", depositSchema);
module.exports = Deposit;
