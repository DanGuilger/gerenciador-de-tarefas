const joi = require('joi');

class projectsModel {
    static get schema() {
        return joi.object({
            nome: joi.string().min(3).max(100).required(),
            descricao: joi.string().min(5).max(500).optional(),
            status: joi.string().valid('pendente', 'em progresso', 'concluído').default('pendente').required(),
            ativo: joi.boolean().default(true).required(),
            criado_em: joi.date().default(() => new Date(), 'data de criação'),
            criador_id: joi.number().integer().required(),
        })
    }
}

module.exports = projectsModel;