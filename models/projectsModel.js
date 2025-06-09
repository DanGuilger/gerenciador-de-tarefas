const joi = require('joi');

const projectsSchema = joi.object({
    nome: joi.string().min(3).max(100).required(),
    descricao: joi.string().min(5).max(500).optional().allow(''),
    status: joi.string().valid('pendente', 'em progresso', 'concluído').default('pendente'),
    ativo: joi.boolean().default(true),
    criado_em: joi.date().default(() => new Date()),
    criador_id: joi.number().integer().required()
});

class projectsModel {
    static get schema() {
        return projectsSchema;
    }
}

module.exports = projectsModel;