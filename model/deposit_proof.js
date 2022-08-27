
const mongoose = require("mongoose");
const connect = require("./dbconnector");
connect("connected to deposit proof database");
require("./user");
require("./deposit_req");

const deposit_proof_Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  deposit_req: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "deposit_req",
    required: true,
  },
  proof_url: {
    type: String,
    required: true,
  },
});

const Deposit_proof = mongoose.model("deposit_proof", deposit_proof_Schema);
module.exports = Deposit_proof;
