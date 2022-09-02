const express = require("express");
const Router = express.Router();
const verifyToken = require("../admin_token/verifyToken");
const User = require("../model/user");
const Admin = require("../admin_model/admin");
const validate_fund_user = require("../admin_validations/validate_admin_fund_user");

Router.post("/", verifyToken, async (req, res) => {
  const request_isvalid = validate_fund_user(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });
    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage: "the user you requested to credit was not found",
      });
    user.set({
      balance: user.balance + parseInt(req.body.amount),
    });
    await user.save();

    res
      .status(200)
      .json({ error: false, message: "you successfully credited this user" });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
