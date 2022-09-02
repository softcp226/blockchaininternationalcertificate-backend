const mongoose = require("mongoose");
const connectDB = require("./connector");
connectDB("connected to admin login database");

const admin_Schema = mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

const admin=mongoose.model("admin",admin_Schema)
module.exports=admin