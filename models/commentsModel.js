const joi = require('joi');

class commentsModel {
    static get schema() {
        return joi.object({
            conteudo: joi.string().min(1).max(500).required(),
            criado_em: joi.date().default(() => new Date(), 'data de criação'),
            tarefa_id: joi.number().integer().required(),
            autor_id: joi.number().integer().required(),
        })
    }
}

module.exports = commentsModel;