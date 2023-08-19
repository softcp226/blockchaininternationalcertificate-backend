const hashpassword = require("./admin_hash/hash_password");
const Admin = require("./admin_model/admin");
const create_admin = async (Email,password) => {
  const hashed_password = await hashpassword(password);
  const admin = await new Admin({
    Email,
    Password: hashed_password,
  });
  const result = await admin.save();
  console.log(result);
};
create_admin("support@blockchaininternationalcertificate.com", "sopuru11@1");
