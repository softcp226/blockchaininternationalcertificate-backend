const mongoose = require("mongoose");
const connect = require("./dbconnector");
connect("connected to certificate database");
const getDay = require("../func/getDate");
require("./user");
require("./cert_deposit")
const certificateSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  certificate_type: {
    type: String,
    required: true,
    enum: [
      "Bronze yield certificate",
      "Silver yield certificate",
      "Gold yield certificate",
      "Diamond Yield Certificate",
      // "ultimate yield certificate",
    ],
  },
  date_requested: {
    type: String,
    required: true,
    default: getDay(),
  },
  date_issued: String,
  state: {
    type: String,
    required: true,
    default: "requested",
    enum: ["requested", "issued", "declined"],
  },
  Status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "active", "inactive", "suspended"],
  },
  // payment_requested: {
  //   type: Boolean,
  //   required: true,
  //   default: false,
  // },
  cert_deposit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cert_deposit",
  },
});

const Certificate = mongoose.model("certificate", certificateSchema);
module.exports = Certificate;
