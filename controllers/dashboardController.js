class dashboardController {
    constructor(service) {
        this.service = service;
    }

    async home(req, res) {
        try {
            const usuario_id = req.usuario_id || 1;
            const estatisticas = await this.service.obterEstatisticasUsuario(usuario_id);
            const tarefasPorPrioridade = await this.service.obterTarefasPorPrioridade(usuario_id);
            const projetosRecentes = await this.service.obterProjetosRecentes(usuario_id);
            const tarefasProximas = await this.service.obterTarefasProximas(usuario_id);

            res.render('dashboard/home', {
                estatisticas,
                tarefasPorPrioridade,
                projetosRecentes,
                tarefasProximas
            });
        } catch (err) {
            console.error('[dashboardController] - erro ao carregar dashboard', err.message);
            res.status(400).send(err.message);
        }
    }
}

module.exports = dashboardController;