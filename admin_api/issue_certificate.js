const express = require("express");
const Router = express.Router();
const validate_buy_certificate = require("../validations/validate_buy_certificate");
const Certificate = require("../model/certificate");
const verifyToken = require("../admin_token/verifyToken");
const Admin = require("../admin_model/admin");
const User=require("../model/user")
const getDay = require("../func/getDate");

const {
  create_mail_options,
  transporter,
} = require("../mailer/issue_certificate");


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

       const user = await User.findById(req.body.user);
       if (!user)
         return res.status(400).json({
           error: true,
           errMessage: "An error occured, The user you're trying to issue a certificate was not found.",
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
    
 transporter.sendMail(
   create_mail_options({
     Name: user.Name,
     reciever: user.Email,
     first_name: certificate.first_name,
     last_name: certificate.last_name,
     certificate_type: certificate.certificate_type,
     ID:certificate._id
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

    res.status(200).json({ error: false, message: certificate });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
