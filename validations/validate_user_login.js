const Joi = require("joi");

const validate_user_login = (req) => {
  const schema = Joi.object({
    Email: Joi.string().email().required(),
    Password: Joi.string().required().min(8),
  });
  const result = schema.validate({
    Email: req.Email,
    Password: req.Password,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_user_login;
