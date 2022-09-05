const express = require("express");
const Router = express.Router();
const Certificate = require("../model/certificate");
const verifyToken = require("../token/verifyToken");
const validate_fetch_one_certificate = require("../validations/validate_fetch_one_certificate");

Router.post("/", verifyToken, async (req, res) => {
  const req_isvalid = validate_fetch_one_certificate(req.body);
  if (req_isvalid != true)
    return res.status(400).json({ error: true, errMessage: req_isvalid });
  try {
    const certificate = await Certificate.findOne({
      _id: req.body.certificate_ID,
      user: req.body.user,
      state: "issued",
    });
    if (!certificate)
      return res
        .status(400)
        .json({
          error: true,
          errMessage:
            "There was an error fetching the requested certificate, please try again later",
        });
        res.status(200).json({error:false,message:certificate})
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
