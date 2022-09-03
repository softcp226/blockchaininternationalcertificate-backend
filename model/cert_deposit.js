const mongoose = require("mongoose");
const connect = require("./dbconnector");
connect("connected to Cert deposit database");
require("./certificate");
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
    type: Number,
    required: true,
    min: 0,
  },
  payment_method: String,
  // required: true,

  deposit_proof: String,
  paid_for_certificate: {
    type: Boolean,
    // required:true,
    default: false,
  },
});
const Cert_deposit = mongoose.model("cert_deposit", depositSchema);
module.exports = Cert_deposit;
