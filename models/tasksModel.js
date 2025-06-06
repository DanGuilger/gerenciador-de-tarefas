const joi = require('joi');

class tasksModel {
    static get schema() {
        return joi.object({
            nome: joi.string().min(3).max(100).required(),
            descricao: joi.string().min(5).max(500).optional(),
            status: joi.string().valid('pendente', 'em progresso', 'concluída').default('pendente').required(),
            prioridade: joi.string().valid('baixa', 'normal', 'média', 'alta').default('normal').required(),
            prazo: joi.date().optional(),
            horario: joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
            projeto_id: joi.number().integer().required(),
            responsavel_id: joi.number().integer().required(),
            criado_em: joi.date().default(() => new Date(), 'data de criação'),
        })
    }
}

module.exports = tasksModel;