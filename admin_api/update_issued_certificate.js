const express = require("express");
const Router = express.Router();
const verifyToken = require("../admin_token/verifyToken");
const User = require("../model/user");
const Certificate = require("../model/certificate");
const Admin = require("../admin_model/admin");
const validate_admin_approve_issued_certificate = require("../admin_validations/validate_admin_approve_certificate");

Router.post("/activate-deactivate", verifyToken, async (req, res) => {
  const req_isvalid = validate_admin_approve_issued_certificate(req.body);
  if (req_isvalid != true)
    return res.status(400).json({ error: true, errMessage: req_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });

    const certificate = await Certificate.findById(
      req.body.certificate_ID,
    ).populate("user");
    if (!certificate)
      return res.status(400).json({
        error: true,
        errMessage:
          "the requested certificate no longer exist, please refresh page",
      });

    await certificate.set({
      Status: certificate.Status == "active" ? "inactive" : "active",
    });
    await certificate.save();
    res.status(200).json({ error: false, message: "success." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, errMessage: error.message });
  }
});





Router.post("/suspend-unsuspend", verifyToken, async (req, res) => {
  const req_isvalid = validate_admin_approve_issued_certificate(req.body);
  if (req_isvalid != true)
    return res.status(400).json({ error: true, errMessage: req_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });

    const certificate = await Certificate.findById(
      req.body.certificate_ID,
    ).populate("user");
    if (!certificate)
      return res.status(400).json({
        error: true,
        errMessage:
          "the requested certificate no longer exist, please refresh page",
      });

    await certificate.set({
      Status: certificate.Status == "active" ? "suspended" : "active",
    });
    await certificate.save();
    res.status(200).json({ error: false, message: "success." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

module.exports = Router;
