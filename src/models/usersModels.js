const Joi = require("joi");

module.exports = Joi.object({
  id: Joi.number().integer().positive().optional(),
  full_name: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  password_hash: Joi.string().max(100).required(),
  is_active: Joi.boolean().default(true),
});