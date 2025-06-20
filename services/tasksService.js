const tasksModel = require('../models/tasksModel');

class tasksService {
    constructor(repository) {
        this.repository = repository;
    }

    async cadastrar(task) {
        const {error} = tasksModel.schema.validate(task);
        if (error) {
            console.error('[tasksService] - validação falhou', error.details[0].message);
            throw new Error(error.details[0].message);
        }
        return await this.repository.inserir(task);
    }

    async listarPorProjeto(projeto_id) {
        return await this.repository.listarPorProjeto(projeto_id);
    }

    async buscarPorId(id) {
        const task = await this.repository.buscarPorId(id);
        if (!task) {
            throw new Error('Tarefa não encontrada');
        }
        return task;
    }

    async atualizar(id, task) {
        const {error} = tasksModel.schema.validate({
            ...task, 
            projeto_id: task.projeto_id || 1,
            responsavel_id: task.responsavel_id || 1
        });
        if (error) {
            console.error('[tasksService] - validação falhou', error.details[0].message);
            throw new Error(error.details[0].message);
        }
        return await this.repository.atualizar(id, task);
    }

    async deletar(id) {
        return await this.repository.deletar(id);
    }
}

module.exports = tasksService;