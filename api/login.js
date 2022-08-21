const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const genToken = require("../token/genToken");
const verifyPassword = require("../hash/comparePassword");
const validateLogin = require("../validations/validate_user_login");

Router.post("/", async (req, res) => {
  const isvalid = validateLogin(req.body);
  if (isvalid != true)
    return res.status(400).json({ error: true, errMessage: isvalid });

  try {
    const user = await User.findOne({ Email: req.body.Email });
    // console.log("use", user);
    if (!user)
      return res
        .status(400)
        .json({ error: true, errMessage: "invalid Email or Password " });

    const passwordIsverified = await verifyPassword(
      req.body.Password,
      user.Password,
    );
    console.log(passwordIsverified);
    if (passwordIsverified != true)
      return res
        .status(400)
        .json({ error: true, errMessage: "invalid Email or password " });

    const token = genToken(user._id);

    res.status(200).json({
      error: false,
      message: { user: user._id },
      token,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: true, errMessage: err.message });
  }
});

module.exports = Router;
