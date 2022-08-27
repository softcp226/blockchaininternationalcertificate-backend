const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const register_user = require("./api/register");
app.use("/api/newUser/register", register_user);
const login = require("./api/login");
app.use("/api/user/login", login);

const fetch_user = require("./api/fetch-user");
app.use("/api/user/fetch", fetch_user);

const buy_certificate = require("./api/buy-certificate");
app.use("/api/user/buy_certificate", buy_certificate);
const fetch_certificate = require("./api/fetch_certificate");
app.use("/api/user/certificate/fetch", fetch_certificate);
const deposit_req = require("./api/deposit_req");
app.use("/api/user/deposit/request", deposit_req);

const deposit_req_proof = require("./api/deposit_proof");
app.use("/api/user/deposit/proof/submit", deposit_req_proof);

const cert_deposit_proof=require("./api/cert_deposit_proof")
app.use("/api/user/cert_deposit/proof/submit",cert_deposit_proof)

const cert_deposit=require("./api/cert_deposit")
app.use("/api/user/certificate/deposit",cert_deposit)
app.use("/", express.static("html"));

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`App started and is running on port ${port}`),
);
