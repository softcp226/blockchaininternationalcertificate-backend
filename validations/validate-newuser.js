const Joi = require("joi");

const validate_newuser = (req) => {
  const schema = Joi.object({
    Name: Joi.string().required().min(3),
    Email: Joi.string().email().required(),
    Password: Joi.string().required().min(8),
  });
  const result = schema.validate({
    Name: req.Name,
    Email: req.Email,
    Password: req.Password,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_newuser;
