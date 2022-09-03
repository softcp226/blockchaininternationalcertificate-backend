const express = require("express");
const Router = express.Router();
const Cert_deposit = require("../model/cert_deposit");
const Certificate = require("../model/certificate");
const verifyToken = require("../token/verifyToken");
const validate_cert_deposit = require("../validations/validate_pay_for_certificate");
const User=require("../model/user")

Router.post("/", verifyToken, async (req, res) => {
  const req_isvalid = validate_cert_deposit(req.body);
  if (req_isvalid != true)
    return res.status(400).json({ error: true, errMessage: req_isvalid });
  try {
    const certificate = await Certificate.findById(req.body.certificate);
    if (!certificate)
      return res.status(400).json({
        error: true,
        errMessage: "Certificate you are trying to pay for no longer exist ",
      });
      const user=await User.findById(req.body.user)
      if(!user)return res.status(400).json({error:true, errMessage:"An error occured, you can't buy certificate at the moment. please login again to buy certificate"})
      if (user.balance < parseInt(req.body.amount))return res.status(400).json({error:true,errMessage:"Insufficient balance !, please deposit more fund to your account to buy certificate or select payment method and make payment to the details provided and then click 'i have made payment'"})
        user.set({
          balance: user.balance - parseInt(req.body.amount),
        });
    const deposit = await new Cert_deposit({
      user: req.body.user,
      certificate: req.body.certificate,
      amount: parseInt(req.body.amount),
      // purpose_of_deposit: req.body.purpose_of_deposit,
      // payment_method: req.body.payment_method,
      paid_for_certificate: true,
    });
    await deposit.save();
    await user.save()
    await certificate.set({ cert_deposit: deposit._id });
    await certificate.save();

    res.status(200).json({ error: false, message: deposit });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
