const mongoose = require("mongoose");
const connect = require("./dbconnector");
connect("connected todeposit proof database");
require("./user");
require("./certificate");

const deposit_proof_Schema = new mongoose.Schema({
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
  proof_url: {
    type: String,
    required: true,
  },
});

const Deposit_proof = mongoose.model("deposit_proof", deposit_proof_Schema);
module.exports = Deposit_proof;
