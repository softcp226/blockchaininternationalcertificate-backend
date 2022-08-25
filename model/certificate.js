const mongoose = require("mongoose");
const connect = require("./dbconnector");
connect("connected to certificate database");
const getDay = require("../func/getDate");
require("./user");
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
      "basic yield certificate",
      "premium yield certificate",
      "ultimate yield certificate",
    ],
  },
  date_requested: {
    type: String,
    required: true,
    default: getDay(),
  },

  state: {
    type: String,
    required: true,
    default: "requested",
    enum: ["requested", "issued"],
  },
  Status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "active", "suspended"],
  },
  payment_requested: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Certificate = mongoose.model("certificate", certificateSchema);
module.exports = Certificate;
