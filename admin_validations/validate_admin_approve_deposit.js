const Joi = require("joi");
const validate_admin_approve_deposit = (req) => {
  const schema = Joi.object({
    admin: Joi.string().required().max(1000),
    // user: Joi.string().required().max(1000),
    deposit_req:Joi.string().required().max(1000),
    deposit_amount: Joi.number().required().min(0),
  });
  const result = schema.validate({
    admin: req.admin,
    // user: req.user,
    deposit_req:req.deposit_req,
    deposit_amount:req.deposit_amount
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_admin_approve_deposit;
