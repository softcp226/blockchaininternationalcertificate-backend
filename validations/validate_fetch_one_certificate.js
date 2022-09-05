const Joi = require("joi");

const validate_fetch_one_certificate = (req) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    certificate_ID: Joi.string().required(),
  });
  const result = schema.validate({
    user: req.user,
    certificate_ID:req.certificate_ID
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_fetch_one_certificate;
