const express = require("express");
const Router = express.Router();
const genToken = require("../admin_token/genToken");
const Admin = require("../admin_model/admin");
const validate_admin = require("../admin_validations/validate_admin_login");
const compare_passsword = require("../admin_hash/compare_password");
Router.post("/", async (req, res) => {
  const request_isvalid = validate_admin(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });
  try {
    const admin = await Admin.findOne({ Email: req.body.Email });
    if (!admin)
      return res.status(400).json({
        error: true,
        errMessage: "invalid Email  or password (mail does not exist)",
      });
    const password_match = await compare_passsword(
      req.body.Password,
      admin.Password,
    );
    if (!password_match)
      return res.status(400).json({
        error: true,
        errMessage: "invalid user name or password (pass err)",
      });
    const token = genToken(admin._id);
    res
      .status(200)
      .json({ error: false, message: { admin: admin._id },token });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
