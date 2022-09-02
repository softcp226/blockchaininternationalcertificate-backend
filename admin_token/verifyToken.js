const jwt = require("jsonwebtoken");
const tokenKey = process.env.admin_tokenKey;

const verifyToken = (req, res, next) => {
  if (!req.body.token)
    return res.status(403).json({
      error: true,
      errMessage: "No token found please login to access this api ",
    });

  try {
    jwt.verify(req.body.token, tokenKey);
    next();
  } catch (error) {
    res.status(400).json({
      error: true,
      errMessage: `${error.message} please login to access this api`,
    });
  }
};
module.exports = verifyToken;
