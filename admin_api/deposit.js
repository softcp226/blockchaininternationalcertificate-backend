const express = require("express");
const Router = express.Router();
const verifyToken = require("../admin_token/verifyToken");
const User = require("../model/user");
const Deposit_req = require("../model/deposit_req");
const Admin = require("../admin_model/admin");
const validate_admin_approve_deposit = require("../admin_validations/validate_admin_approve_deposit");
const validate_admin_delete_deposit = require("../admin_validations/validate_admin_delete_deposit");
const {
  create_mail_options,
  transporter,
} = require("../mailer/approve_deposit_mail");

Router.post("/findOne", verifyToken, async (req, res) => {
  const req_isvalid = validate_admin_delete_deposit(req.body);
  if (req_isvalid != true)
    return res.status(400).json({ error: true, errMessage: req_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });
    const deposit_req = await Deposit_req.findById(req.body.deposit_req);
    if (!deposit_req)
      return res.status(400).json({
        error: true,
        errMessage:
          "the 'Deposit  req' you requested to delete no longer exist",
      });
    res.status(200).json({ error: false, message: deposit_req });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

Router.post("/approve", verifyToken, async (req, res) => {
  const req_isvalid = validate_admin_approve_deposit(req.body);
  if (req_isvalid != true)
    return res.status(400).json({ error: true, errMessage: req_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });

    const deposit_req = await Deposit_req.findById(req.body.deposit_req);
    if (!deposit_req)
      return res
        .status(400)
        .json({
          error: true,
          errMessage: "the deposit you requested to approve no longer exist",
        });

    const user = await User.findById(deposit_req.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage:
          "Invalid request, the user your are trying to credit no longer exist. Please delete this request",
      });

    await user.set({
      balance: user.balance + parseInt(req.body.deposit_amount),
    });
    await user.save();

    await Deposit_req.findByIdAndDelete(req.body.deposit_req);

    transporter.sendMail(
      create_mail_options({
        Name: user.Name,
        reciever: user.Email,
        deposit_amount: `$${req.body.deposit_amount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
        // passport: passport_url.url,
      }),
      (err, info) => {
        if (err) return console.log(err.message);
        console.log(info);
        // return res.status(400).json({
        //   error: true,
        //   errMessage: `Encounterd an error while trying to send an email to you: ${err.message}, try again`,
        // });
      },
    );

    res
      .status(400)
      .json({ error: false, message: "You successfully Approved a deposit" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

Router.delete("/deleteOne", verifyToken, async (req, res) => {
  const req_isvalid = validate_admin_delete_deposit(req.body);
  if (req_isvalid != true)
    return res.status(400).json({ error: true, errMessage: req_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });
    const deposit_req = await Deposit_req.findByIdAndDelete(
      req.body.deposit_req,
    );
    if (!deposit_req)
      return res
        .status(400)
        .json({
          error: true,
          errMessage:
            "the 'Deposit  req' you requested to delete no longer exist",
        });

    res
      .status(200)
      .json({
        error: false,
        message: "you successfully deleted this deposit request",
      });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

module.exports = Router;
