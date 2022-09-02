const express = require("express");
const Router = express.Router();
const verifyToken = require("../admin_token/verifyToken");
const Deposit = require("../model/deposit_req");
const Admin = require("../admin_model/admin");
const validate_admin_fetchuser = require("../admin_validations/validate_admin_fetch_user");
Router.post("/", verifyToken, async (req, res) => {
  const request_isvalid = validate_admin_fetchuser(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });
    const deposit_request = await Deposit.find().populate("user");
    if (deposit_request.length < 1)
      return res
        .status(400)
        .json({
          error: true,
          errMessage: "No one has requested to m ake a payment at the moment",
        });
    res.status(200).json({ error: false, message: deposit_request });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
