const Joi = require("joi");

module.exports = Joi.object({
  id: Joi.number().integer().positive().optional(),
  conteudo: Joi.string().min(1).required(),
  criado_em: Joi.date().iso().default(() => new Date().toISOString()),
  tarefa_id: Joi.number().integer().positive().required(),
  autor_id: Joi.number().integer().positive().allow(null).optional(),
});