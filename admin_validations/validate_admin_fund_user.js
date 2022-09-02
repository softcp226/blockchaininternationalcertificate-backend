const Joi = require("joi");
const validate_fund_user = (req) => {
  const schema = Joi.object({
    admin: Joi.string().required().max(1000),
    user: Joi.string().required().max(1000),
    amount: Joi.number().required().min(0),
  });
  const result = schema.validate({
    admin: req.admin,
    user: req.user,
    amount: req.amount,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_fund_user;
