class dashboardService {
    constructor(repository) {
        this.repository = repository;
    }

    async obterEstatisticasUsuario(usuario_id) {
        return await this.repository.obterEstatisticasUsuario(usuario_id);
    }

    async obterTarefasPorPrioridade(usuario_id) {
        return await this.repository.obterTarefasPorPrioridade(usuario_id);
    }

    async obterProjetosRecentes(usuario_id) {
        return await this.repository.obterProjetosRecentes(usuario_id);
    }

    async obterTarefasProximas(usuario_id) {
        return await this.repository.obterTarefasProximas(usuario_id);
    }
}

module.exports = dashboardService;