const joi = require('joi');

const tasksSchema = joi.object({
    nome: joi.string().min(3).max(100).required(),
    descricao: joi.string().min(5).max(500).optional().allow(''),
    status: joi.string().valid('pendente', 'em progresso', 'concluída').default('pendente'),
    prioridade: joi.string().valid('baixa', 'normal', 'média', 'alta').default('normal'),
    prazo: joi.date().optional().allow(null),
    horario: joi.string().optional().allow('', null),
    projeto_id: joi.number().integer().required(),
    responsavel_id: joi.number().integer().required(),
    criado_em: joi.date().default(() => new Date())
});

class tasksModel {
    static get schema() {
        return tasksSchema;
    }
}

module.exports = tasksModel;