const mongoose = require("mongoose");
const connect = require("./dbconnector");
connect("connected to Cert deposit database");
require("./certificate")
require("./user");
const depositSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  certificate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "certificate",
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
  deposit_proof: String,
});
const Cert_deposit = mongoose.model("cert_deposit", depositSchema);
module.exports = Cert_deposit;
