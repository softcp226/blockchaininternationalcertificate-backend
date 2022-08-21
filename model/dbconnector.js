const mongoose = require("mongoose");
const db_url = process.env.db_url;

const dbConnector = (connectTxt) => {
  mongoose
    .connect(db_url)
    .then(() => console.log(connectTxt))
    .catch((err) => console.log(err.message));
};
module.exports = dbConnector;
