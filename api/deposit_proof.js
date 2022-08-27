const express = require("express");
const Router = express.Router();
const Deposit_proof = require("../model/deposit_proof");
const Deposit_req = require("../model/deposit_req");
const verifyToken = require("../token/verifyToken");
const validate_deposit_proof = require("../validations/validate_deposit_proof");

const {
  create_mail_options,
  transporter,
} = require("../mailer/buy_certificate_deposit_proof");
const cloudinary = require("../file_handler/cloudinary");
const upload = require("../file_handler/multer");
const fs = require("fs");

Router.post("/", upload.any("proof"), verifyToken, async (req, res) => {
  if (
    req.files[0].mimetype === "image/jpeg" ||
    req.files[0].mimetype == "image/png"
  ) {
    const req_isvalid = validate_deposit_proof(req.body);
    if (req_isvalid != true)
      return res.status(400).json({ error: true, errMessage: req_isvalid });

    try {
      const deposit = await Deposit_req.findById(req.body.deposit_reqID);
      if (!deposit)
        return res.status(403).json({
          error: true,
          errMessage:
            "invalid request, your deposit request does not exist. Please click on deposit fund and follow the procedeurs to submit proof",
        });

      const uploader = async (path) =>
        await cloudinary.uploads(path, "passport");
      let proof_url;
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        proof_url = newPath;
        fs.unlinkSync(path);
      }
      console.log(proof_url);
      if (proof_url.error)
        return res.status(400).json({
          error: true,
          errMessage:
            "Something went wrong in the server while trying to upload your passport, please check passport and try again",
        });

      console.log("url", proof_url.url);
      await deposit.set({
        deposit_proof: proof_url.url,
      });
      await deposit.save();
     
      // const deposit_proof = await new Deposit_proof({
      //   user: req.body.user,
      //   deposit_req: req.body.deposit_reqID,
      //   proof_url: c,
      // });
      // await deposit_proof.save();
      res.status(200).json({ error: false, message: "success." });
    } catch (error) {
      // console.log(error)
      res.status(400).json({ error: true, errMessage: error.message });
    }
  } else {
    return res.status(403).json({
      error: true,
      errMessage: "Unsupported file, please upload a valid photo",
    });
  }
});
module.exports = Router;
