const express = require("express");
const Router = express.Router();
const validate_fetch_certificate = require("../validations/validate_fetch_certificate");
const validate_fetch_certificate_byid = require("../validations/validate_fetch_certificate_by_id");
const Certificate = require("../model/certificate");
const verifyToken = require("../token/verifyToken");

Router.post("/", verifyToken, async (req, res) => {
  const req_isvalid = validate_fetch_certificate(req.body);
  if (req_isvalid != true)
    return res.status(400).json({ error: true, errMessage: req_isvalid });
  try {
    const requested_certificate = await Certificate.find({
      user: req.body.user,
      //   payment_requested: false,
    });
    if (requested_certificate.length <= 0)
      return res.status(404).json({
        error: true,
        errMessage:
          "You have not completely requested for any certificate at the moment",
      });

    const issued_certificate = await Certificate.find({
      user: req.body.user,
      // payment_requested: true,
      state: "issued",
    });
    res.status(200).json({
      error: false,
      message: {
        requested_certificate,
        issued_certificate: issued_certificate.length,
      },
    });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});





Router.post("/search_byid", verifyToken, async (req, res) => {
  const req_isvalid = validate_fetch_certificate_byid(req.body);
  if (req_isvalid != true)
    return res.status(400).json({ error: true, errMessage: req_isvalid });
  try {
    const requested_certificate = await Certificate.findOne({
      user: req.body.user,
      _id: req.body.certificate_ID,
      //   payment_requested: false,
    });
    if (!requested_certificate)return res.status(404).json({
        error: true,
        errMessage:
          "the certificate you are trying to pay for does not exist",
      });

   
    res.status(200).json({
      error: false,
      message: {
       certificate: requested_certificate,
        // issued_certificate: issued_certificate.length,
      },
    });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});


module.exports = Router;
