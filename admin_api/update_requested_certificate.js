const express = require("express");
const Router = express.Router();
const verifyToken = require("../admin_token/verifyToken");
const User = require("../model/user");
const Certificate = require("../model/certificate");
const Admin = require("../admin_model/admin");
const validate_admin_approve_certificate = require("../admin_validations/validate_admin_approve_certificate");
// const Certificate = require("../model/certificate");
const getDay = require("../func/getDate");
const {
  create_mail_options,
  transporter,
} = require("../mailer/approve_certificate_mail");

const {
  create_mail_options2,
  transporter2,
} = require("../mailer/decline_certificate_mail");

Router.post("/approve", verifyToken, async (req, res) => {
  const req_isvalid = validate_admin_approve_certificate(req.body);
  if (req_isvalid != true)
    return res.status(400).json({ error: true, errMessage: req_isvalid });
  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });

    const certificate = await Certificate.findById(req.body.certificate_ID).populate("user");
    if (!certificate)
      return res.status(400).json({
        error: true,
        errMessage: "the requested certificate no longer exist",
      });

    await certificate.set({
      state: "issued",
      Status: "active",
      date_issued: getDay(),
    });
    await certificate.save();

 transporter.sendMail(
   create_mail_options({
     Name: certificate.user.Name,
     reciever: certificate.user.Email,
     first_name: certificate.first_name,
     last_name: certificate.last_name,
     certificate_type: certificate.certificate_type,
     ID: certificate._id,
     //  date_requested:certificate.date_requested
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

    res.status(200).json({
      error: false,
      message: "You have successfully issued and approved the certificate",
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

Router.post("/decline", verifyToken, async (req, res) => {
  const req_isvalid = validate_admin_approve_certificate(req.body);
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
    ).populate("user");;
    if (!certificate)
      return res.status(400).json({
        error: true,
        errMessage: "the requested certificate no longer exist",
      });

    await certificate.set({
      state: "declined",
      Status: "inactive",
      //   date_issued: getDay(),
    });
    await certificate.save();

    
 transporter2.sendMail(
   create_mail_options2({
     Name: certificate.user.Name,
     reciever: certificate.user.Email,
     first_name: certificate.first_name,
     last_name: certificate.last_name,
     certificate_type: certificate.certificate_type,
     ID: certificate._id,
     //  date_requested:certificate.date_requested
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

    res.status(200).json({
      error: false,
      message: "You have successfully declined the requested certificate request",
    });
  } catch (error) {
        console.log(error);
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
