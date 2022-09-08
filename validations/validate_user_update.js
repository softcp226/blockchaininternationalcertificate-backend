const Joi = require("joi");

const validate_user_update = (req) => {
  const Schema = Joi.object({
    user: Joi.string().required(),
    Name: Joi.string().required(),
    Email: Joi.string().email().required(),
  });
  const result = Schema.validate({
    user: req.user,
    Name: req.Name,
    Email: req.Email,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_user_update;
