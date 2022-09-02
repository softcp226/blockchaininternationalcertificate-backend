const Joi = require("joi");
const validate_admin_approve_certificate = (req) => {
  const schema = Joi.object({
    admin: Joi.string().required().max(1000),
    certificate_ID: Joi.string().required().max(1000),
  });
  const result = schema.validate({
    admin: req.admin,
    certificate_ID: req.certificate_ID,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_admin_approve_certificate;
