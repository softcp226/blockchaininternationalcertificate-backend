const Joi = require("joi");

const validate_deposit_proof = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().min(0),
    deposit_reqID: Joi.string().required().min(0),
  });
  const result = schema.validate({
    user: req.user,
    deposit_reqID: req.deposit_reqID,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_deposit_proof;
