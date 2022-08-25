const Joi = require("joi");

const validate_fetch_certificate = (req) => {
  const schema = Joi.object({
    user: Joi.string().required(),
  });
  const result = schema.validate({
    user: req.user,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_fetch_certificate;
