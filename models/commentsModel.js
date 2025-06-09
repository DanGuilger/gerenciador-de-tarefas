const joi = require('joi');

const commentsSchema = joi.object({
    conteudo: joi.string().min(1).max(500).required(),
    criado_em: joi.date().default(() => new Date()),
    tarefa_id: joi.number().integer().required(),
    autor_id: joi.number().integer().required()
});

class commentsModel {
    static get schema() {
        return commentsSchema;
    }
}

module.exports = commentsModel;