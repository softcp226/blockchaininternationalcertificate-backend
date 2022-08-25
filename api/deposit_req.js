const express = require("express");
const Router = express.Router();
const Deposit = require("../model/deposit_req");
const verifyToken = require("../token/verifyToken");
const validate_deposit = require("../validations/validate_deposit");

Router.post("/", verifyToken, async (req, res) => {
  const req_isvalid = validate_deposit(req.body);
  if (req_isvalid != true)
    return res.status(400).json({ error: true, errMessage: req_isvalid });
  try {
    const deposit = await new Deposit({
      user: req.body.user,
      amount: req.body.amount,
      purpose_of_deposit: req.body.purpose_of_deposit,
      payment_method: req.body.payment_method,
    });
    await deposit.save();
    res.status(200).json({ error: false, message: deposit });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
