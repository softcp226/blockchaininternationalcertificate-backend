const Joi = require("joi");

const validate_user = (req) => {
  const schema = Joi.object({
    // Email: Joi.string().email().required(),
    reset_token: Joi.string().required(),
    password: Joi.string().required(),
  });
  const result = schema.validate({
    // Email: req.Email,
    reset_token: req.reset_token,
    password:req.password
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_user;
