const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const register_user = require("./api/register");
app.use("/api/newUser/register", register_user);
const login = require("./api/login");
app.use("/api/user/login", login);
const admin_login = require("./admin_api/login");
app.use("/api/admin/login", admin_login);
const admin_fetch_user = require("./admin_api/fetch_user");
app.use("/api/admin/users/fetch", admin_fetch_user);
const admin_delete_user = require("./admin_api/delete_user");
app.use("/api/admin/user/delete", admin_delete_user);
const fund_user = require("./admin_api/fund-user");
app.use("/api/admin/fund_user", fund_user);
const admin_fetch_certificate=require("./admin_api/fetch_certificate_request")
app.use("/api/admin/certificate/fetch",admin_fetch_certificate)
const admin_fetch_deposit=require("./admin_api/fetch_deposit")
app.use("/api/admin/deposit/fetch",admin_fetch_deposit)

const admin_fetch_issued_certificate=require("./admin_api/fetch_issued_certificate")
app.use("/api/admin/issued_certificate/fetch",admin_fetch_issued_certificate)
const admin_approve_deposit=require("./admin_api/deposit")
app.use("/api/admin/deposit",admin_approve_deposit)
const update_requested_certificate=require("./admin_api/update_requested_certificate")
app.use("/api/requested_certificate/update",update_requested_certificate)

const update_issued_certificate=require("./admin_api/update_issued_certificate")
app.use("/api/admin/issued_certificate/update",update_issued_certificate)

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

const cert_deposit_proof = require("./api/cert_deposit_proof");
app.use("/api/user/cert_deposit/proof/submit", cert_deposit_proof);

const cert_deposit = require("./api/cert_deposit");
app.use("/api/user/certificate/deposit", cert_deposit);
app.use("/", express.static("html"));
app.use("/admin", express.static("admin"));
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`App started and is running on port ${port}`),
);
