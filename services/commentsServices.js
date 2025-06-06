const commentsModel = require('../models/commentsModel');

class commentsService {
    constructor(repository) {
        this.repository = repository;
    }

    async cadastrar(comment) {
        const {error} = commentsModel.schema.validate(comment);
        if (error) {
            console.error('[commentsService] - validação falhou', error.details[0].message);

            throw new Error(error.details[0].message);
        }
        return await this.repository.inserir(comment);
    }

    async listarPorTarefa(tarefa_id) {
        return await this.repository.listarPorTarefa(tarefa_id);
    }

    async deletar(id) {
        return await this.repository.deletar(id);
    }
}

module.exports = commentsService;