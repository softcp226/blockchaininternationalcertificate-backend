const express = require("express");
const Router = express.Router();
const Cert_deposit = require("../model/cert_deposit");
const Certificate = require("../model/certificate");
const verifyToken = require("../token/verifyToken");
const validate_cert_deposit = require("../validations/validate_cert_deposit");

Router.post("/", verifyToken, async (req, res) => {
  const req_isvalid = validate_cert_deposit(req.body);
  if (req_isvalid != true)
    return res.status(400).json({ error: true, errMessage: req_isvalid });
  try {
    const deposit = await new Cert_deposit({
      user: req.body.user,
      certificate: req.body.certificate,
      amount: parseInt(req.body.amount),
      // purpose_of_deposit: req.body.purpose_of_deposit,
      payment_method: req.body.payment_method,
    });
    await deposit.save();
    res.status(200).json({ error: false, message: deposit });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
