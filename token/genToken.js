const jwt = require("jsonwebtoken");
const tokenKey = process.env.tokenKey;
const gentoken = (userID) => {
  const token = jwt.sign({ userID }, tokenKey);
  return token;
};
module.exports = gentoken;
