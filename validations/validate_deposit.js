const Joi = require("joi");

const validate_deposit = (req) => {
  const Schema = Joi.object({
    user: Joi.string().required(),
    amount: Joi.string().required(),
    purpose_of_deposit: Joi.string().required(),
    payment_method: Joi.string().required(),
  });
  const result = Schema.validate({
    user: req.user,
    amount: req.amount,
    purpose_of_deposit: req.purpose_of_deposit,
    payment_method: req.payment_method,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_deposit;
