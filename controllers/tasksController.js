class tasksController {
    constructor(service) {
        this.service = service;
        this.commentsService = null;
    }

    setCommentsService(commentsService) {
        this.commentsService = commentsService;
    }

    formCadastro(req, res) {
        const projeto_id = req.query.projeto_id || req.params.projeto_id;
        res.render('tasks/cadastro', { projeto_id, responsavel_id: req.usuario_id || 1 }); 
    }

    async cadastrar(req, res) {
        try {
            await this.service.cadastrar(req.body);
            if (req.body.projeto_id) {
                res.redirect(`/projects/${req.body.projeto_id}`);
            } else {
                res.redirect('/tasks');
            }
        } catch (err) {
            console.error('[tasksController] - erro na criação da tarefa', err.message);
            res.status(400).send(err.message);
        }
    }

    async listarPorProjeto(req, res) {
        try {
            const tasks = await this.service.listarPorProjeto(req.params.projeto_id);
            res.render('tasks/lista', { tasks, projeto_id: req.params.projeto_id });
        } catch (err) {
            console.error('[tasksController] - erro ao listar tarefas', err.message);
            res.status(400).send(err.message);
        }
    }

    async detalhes(req, res) {
        try {
            const task = await this.service.buscarPorId(req.params.id);
            
            let comments = [];
            if (this.commentsService) {
                comments = await this.commentsService.listarPorTarefa(req.params.id);
            }
            
            res.render('tasks/detalhes', { task, comments });
        } catch (err) {
            console.error('[tasksController] - erro ao buscar tarefa', err.message);
            res.status(404).send(err.message);
        }
    }

    async formEdicao(req, res) {
        try {
            const task = await this.service.buscarPorId(req.params.id);
            res.render('tasks/editar', { task });
        } catch (err) {
            console.error('[tasksController] - erro ao carregar formulário de edição', err.message);
            res.status(404).send(err.message);
        }
    }

    async atualizar(req, res) {
        try {
            await this.service.atualizar(req.params.id, req.body);
            res.redirect(`/tasks/${req.params.id}`);
        } catch (err) {
            console.error('[tasksController] - erro ao atualizar tarefa', err.message);
            res.status(400).send(err.message);
        }
    }

    async deletar(req, res) {
        try {
            const task = await this.service.buscarPorId(req.params.id);
            await this.service.deletar(req.params.id);
            res.redirect(`/projects/${task.projeto_id}`);
        } catch (err) {
            console.error('[tasksController] - erro ao deletar tarefa', err.message);
            res.status(400).send(err.message);
        }
    }
}

module.exports = tasksController;