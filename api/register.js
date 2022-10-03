const express = require("express");
const Router = express.Router();
const validate_newuser = require("../validations/validate-newuser");
const hashpassword = require("../hash/hashpassword");
const User = require("../model/user");
const {
  create_mail_options,
  transporter,
} = require("../mailer/reg_success_mail");
// const cloudinary = require("../file_handler/cloudinary");
// const upload = require("../file_handler/multer");
const genToken = require("../token/genToken");
// const fs = require("fs");

Router.post("/", async (req, res) => {
  
  //   req.files.mimetype !== "image/jpeg" ||
  //     (req.files.mimetype !== "image/png") !== true,
  // );
  const req_isvalid = validate_newuser(req.body);
  if (req_isvalid != true)
    return res.status(400).json({ error: true, errMessage: req_isvalid });

  try {
    const user = await User.findOne({ Email: req.body.Email });
    if (user)
      return res.status(400).json({
        error: true,
        errMessage: "User already exist, please login",
      });

    // const uploader = async (path) => await cloudinary.uploads(path, "passport");
    // let passport_url;
    // const files = req.files;
    // for (const file of files) {
    //   const { path } = file;
    //   const newPath = await uploader(path);
    //   passport_url = newPath;
    //   fs.unlinkSync(path);
    // }
    // console.log(passport_url);
    // if (passport_url.error)
    //   return res.status(400).json({
    //     error: true,
    //     errMessage:
    //       "Something went wrong in the server while trying to upload your passport, please check passport and try again",
    //   });

    const password = await hashpassword(req.body.Password);
    console.log("password", password);
    const newUser = await new User({
      Name: req.body.Name,
      Email: req.body.Email,
      Passport: "/css/assets/user.png",
      Password: password,
    });
    await newUser.save();
    const token = genToken(newUser._id);

    transporter.sendMail(
      create_mail_options({
        Name: req.body.Name,
        reciever: req.body.Email,
        passport:
          "https://blockchaininternationalexchag.herokuapp.com/css/assets/user.png",
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
    res
      .status(200)
      .json({ error: false, message: { user: newUser._id }, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, errMessage: error.message });
  }



});

module.exports = Router;
