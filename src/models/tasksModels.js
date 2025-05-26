const Joi = require("joi");

const taskSchema = Joi.object({
  id: Joi.number().integer().positive().optional(),
  nome: Joi.string().required(),
  descricao: Joi.string().required(),
  status: Joi.string().valid("pendente", "em andamento", "concluido").default("pendente"),
  prioridade: Joi.string().valid("baixa", "normal", "alta").default("normal"),
  prazo: Joi.date().optional(),
  horario: Joi.string().optional(),
  projeto_id: Joi.number().integer().required(),
  responsavel_id: Joi.number().integer().optional(),
});

module.exports = taskSchema;