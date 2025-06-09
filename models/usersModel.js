const joi = require('joi');

const usersSchema = joi.object({
    nome_completo: joi.string().min(3).max(100).required(),
    email: joi.string().min(5).max(100).email().required(),
    senha_hash: joi.string().required(),
    ativo: joi.boolean().default(true)
});

class usersModel {
    static get schema() {
        return usersSchema;
    }
}

module.exports = usersModel;