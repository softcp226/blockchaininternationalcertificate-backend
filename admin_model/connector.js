const mongoose = require("mongoose");
// const db_url = process.env.db_url;
const db_url ="mongodb+srv://admin:password1.1@cluster0.cghof.mongodb.net/blockchaininternationalexchange";
// const db_url = "mongodb://localhost:27017/blockchaininternationalexchange";
const dbConnector = (connectTxt) => {
  mongoose
    .connect(db_url)
    .then(() => console.log(connectTxt))
    .catch((err) => console.log(err.message));
};
module.exports = dbConnector;
