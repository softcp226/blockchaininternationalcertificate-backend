const express = require("express");
const Router = express.Router();
const validate_buy_certificate = require("../validations/validate_buy_certificate");
const Certificate = require("../model/certificate");
const verifyToken = require("../admin_token/verifyToken");
const Admin = require("../admin_model/admin");
const getDay = require("../func/getDate");

Router.post("/", verifyToken, async (req, res) => {
  const req_isvalid = validate_buy_certificate(req.body);
  if (req_isvalid != true)
    return res.status(400).json({ error: true, errMessage: req_isvalid });
  try {

    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });
      
    const certificate = await new Certificate({
      user: req.body.user,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      country: req.body.country,
      amount: req.body.amount,
      certificate_type: req.body.certificate_type,
      state: "issued",
      Status: "active",
      date_issued: getDay(),
    });
    await certificate.save();
    res.status(200).json({ error: false, message: certificate });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
