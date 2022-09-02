const express = require("express");
const Router = express.Router();
const verifyToken = require("../admin_token/verifyToken");
const Certificate = require("../model/certificate");
const Admin = require("../admin_model/admin");
const validate_admin_fetch_certificate = require("../admin_validations/validate_admin_fetch_certificate");

Router.post("/", verifyToken, async (req, res) => {
  const request_isvalid = validate_admin_fetch_certificate(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });
    const certificates = await Certificate.find({state:"issued"})
      .populate("user")
      .populate("cert_deposit");
      console.log(certificates)
    if (certificates.length < 1)
      return res.status(400).json({
        error: true,
        errMessage: "No issued certificates at the moment you can approve a certificate from requested certificate to see it here",
      });
    res.status(200).json({ error: false, message: certificates });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
