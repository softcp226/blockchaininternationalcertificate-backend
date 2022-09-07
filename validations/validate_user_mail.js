const Joi = require("joi");

const validate_user = (req) => {
  const schema = Joi.object({
    Email: Joi.string().email().required(),
  });
  const result = schema.validate({
    Email: req.Email,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_user;
