const Joi = require("joi");

const validate_deposit = (req) => {
  const Schema = Joi.object({
    user: Joi.string().required(),
    amount: Joi.number().required(),
    certificate: Joi.string().required(),
    // payment_method: Joi.string().required(),
  });
  const result = Schema.validate({
    user: req.user,
    amount: req.amount,
    certificate: req.certificate,
    // payment_method: req.payment_method,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_deposit;
