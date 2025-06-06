const joi = require('joi');

class usersModel {
    static get schema() {
        return joi.object({
            id: joi.number().integer().required(),
            nome_completo: joi.string().min(3).max(100).required(),
            email: joi.string().min(5).max(100).email().required(),
            senha_hash: joi.string().required(),
            ativo: joi.boolean().default(true)
        })
    }
}

module.exports = usersModel;