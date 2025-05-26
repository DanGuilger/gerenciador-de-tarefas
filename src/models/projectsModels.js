const Joi = require("joi");

const projectSchema = Joi.object({
  id: Joi.number().integer().positive().optional(),
  nome: Joi.string().required(),
  descricao: Joi.string().required(),
  status: Joi.string().valid("pendente", "ativo", "concluido").default("pendente"),
  ativo: Joi.boolean().default(true),
  criador_id: Joi.number().integer().required(),
});

module.exports = projectSchema;