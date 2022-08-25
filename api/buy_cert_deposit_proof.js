const express = require("express");
const Router = express.Router();
const Deposit_proof = require("../model/buy_certificate_deposit_proof");
const verifyToken = require("../token/verifyToken");
const validate_deposit_proof = require("../validations/validate_user");

const {
  create_mail_options,
  transporter,
} = require("../mailer/buy_certificate_deposit_proof");
const cloudinary = require("../file_handler/cloudinary");
const upload = require("../file_handler/multer");
const fs = require("fs");

Router.post("/", upload.any("proof"), verifyToken, (req, res) => {});
module.exports = Router;
