const Joi = require("joi");

const validate_user = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().min(0),
    certificateID: Joi.string().required().min(0),
  });
  const result = schema.validate({
    user: req.user,
    certificateID: req.certificateID,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_user;
