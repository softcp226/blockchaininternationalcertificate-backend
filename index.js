const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const register_user = require("./api/register");
app.use("/api/newUser/register", register_user);

const login = require("./api/login");
app.use("/api/user/login", login);

app.use("/", express.static("html"));

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`App started and is running on port ${port}`),
);
