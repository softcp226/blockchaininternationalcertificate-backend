const bcrypt = require("bcrypt");

const comparePassword=async(password,hashedpassword)=>{
const checkedPassword = await bcrypt.compare(password, hashedpassword);
return checkedPassword;
}
module.exports=comparePassword