const Joi = require("joi");

const validate_buy_certificate = (req) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    country: Joi.string().required(),
    amount: Joi.number().required(),
    certificate_type: Joi.string().required(),
  });
  const result = schema.validate({
    user: req.user,
    first_name: req.first_name,
    last_name: req.last_name,
    country: req.country,
    amount: req.amount,
    certificate_type: req.certificate_type,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_buy_certificate;
