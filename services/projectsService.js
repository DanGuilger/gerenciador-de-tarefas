const projectsModel = require('../models/projectsModel');

class projectsService {
    constructor(repository) {
        this.repository = repository;
    }

    async cadastrar(project) {
        const {error} = projectsModel.schema.validate(project);
        if (error) {
            console.error('[projectsService] - validação falhou', error.details[0].message);

            throw new Error(error.details[0].message);
        }
        return await this.repository.inserir(project);
    }

    async listarPorUsuario(criador_id) {
        return await this.repository.listarPorUsuario(criador_id);
    }

    async buscarPorId(id) {
        const project = await this.repository.buscarPorId(id);
        if (!project) {
            throw new Error('Projeto não encontrado');
        }
        return project;
    }

    async atualizar(id, project) {
        const {error} = projectsModel.schema.validate({...project, id, criador_id: 1});
        if (error) {
            console.error('[projectsService] - validação falhou', error.details[0].message);

            throw new Error(error.details[0].message);
        }
        return await this.repository.atualizar(id, project);
    }

    async deletar(id) {
        return await this.repository.deletar(id);
    }
}

module.exports = projectsService;